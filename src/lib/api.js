const get = url => (
	fetch(url)
		.then(response => (
			response.ok ?
			Promise.resolve(response) :
			Promise.reject(new Error(response.statusText))
		))
		.then(response => response.json())
		.catch(error => ({ error }))
)

export default {
	feed() { return get("/api/content") },
	post(name) { return get(`/api/content/${name}`) }
}
