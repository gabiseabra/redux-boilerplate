import promisify from "util.promisify"
import { createRequest, createResponse } from "node-mocks-http"
import ApiClient from "../../src/lib/ApiClient"
import createMiddleware from "../../src/lib/middleware"

export const apiClient = () => function () {
	this.apiClient = new ApiClient(process.env.PRISMIC_REPO)
}

function createTestMiddleware(...args) {
	const fun = promisify(createMiddleware(...args))
	fun.run = async (request, response) => {
		const req = createRequest(request || { path: "/" })
		const res = createResponse(response || {})
		await fun(req, res)
		return { req, res }
	}
	return fun
}

export const middleware = (...args) => function () {
	this.middleware = createTestMiddleware.call(this, ...args)
}
