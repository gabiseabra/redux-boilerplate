import axios from "axios"

export function apiUrl(options) {
	const host = options.host || "localhost"
	const port = options.port || 3002
	return `http://${host}:${port}`
}

export default class ApiClient {
	constructor(options) {
		if(typeof options === "string") {
			this.url = options
		} else {
			this.url = apiUrl(options)
		}
	}

	get = (url) => (
		axios.get(this.url + url)
			.then(response => response.data)
			.catch(error => ({ error }))
	)

	info = () => this.get("/info")

	feed = () => this.get("/posts")

	post = (name) => this.get(`/posts/${name}`)
}
