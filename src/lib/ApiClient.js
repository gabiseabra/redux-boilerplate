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

	feed = () => this.get("/content")

	post = (name) => this.get(`/content/${name}`)
}
