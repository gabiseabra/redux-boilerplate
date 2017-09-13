import fetch from "isomorphic-fetch"
import ExtendableError from "es6-error"

const API_URL = "https://jsonplaceholder.typicode.com"

export class ResponseError extends ExtendableError {
	constructor({ status, statusText }) {
		super(`HTTP Error: [${status}] ${statusText}`)
		this.status = status
		this.statusText = statusText
	}
}

export default class ApiClient {
	constructor(url = API_URL) {
		this.url = url
	}

	fetch = (url, options = {}) => fetch(this.url + url, options)
		.then((response) => {
			if(response.status >= 300 || response.status < 200) {
				throw new ResponseError(response)
			}
			return response.json()
		})

	feed = () => this.fetch("/posts")

	post = id => this.fetch(`/posts/${id}`)
}
