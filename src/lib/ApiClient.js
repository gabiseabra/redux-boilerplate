import axios from "axios"
import ExtendableError from "es6-error"

export class ResponseError extends ExtendableError {
	constructor({ status, statusText }) {
		super(`HTTP Error: [${status}] ${statusText}`)
		this.status = status
		this.statusText = statusText
	}
}

export default class ApiClient {
	constructor(url) {
		this.url = url
	}

	get = url => (
		axios.get(this.url + url, { validateStatus: undefined })
			.then(response => {
				if(response.status >= 300 || response.status < 200) {
					throw new ResponseError(response)
				}
				return response.data
			})
			.catch(error => ({ error }))
	)

	info = () => this.get("/info")

	feed = () => this.get("/posts")

	post = name => this.get(`/posts/${name}`)
		.then(response => new Promise(resolve => {
			setTimeout(() => resolve(response), 2000)
		}))
}
