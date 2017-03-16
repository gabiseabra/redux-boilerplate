import axios from "axios"

const trim = (str) => str.replace(/\/$/, "")

export default class ApiClient {
	constructor(base) {
		this.base = trim(base)
	}

	get = (url) => (
		axios.get(this.base + url)
			.then(response => response.data)
			.catch(error => ({ error }))
	)

	info = () => this.get("/info")

	feed = () => this.get("/posts")

	post = (name) => this.get(`/posts/${name}`)
}
