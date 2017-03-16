import axios from "axios"

export default class ApiClient {
	constructor(options) {
		const host = options.host || "localhost"
		const port = options.port || 3002
		this.url = `http://${host}:${port}`
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
