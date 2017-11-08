import React from "react"
import promisify from "util.promisify"
import { Switch, Route, Redirect } from "react-router-dom"
import { renderToString } from "react-dom/server"
import { createRequest, createResponse } from "node-mocks-http"
import createMiddleware from "../../src/lib/middleware"

const Root = props => (<div data-test="FOO" {...props} />)

const RouterRoot = () => (
	<Switch>
		<Route exact path="/" render={() => "TEST_HOME"} />
		<Route exact path="/foo" render={() => "TEST_FOO"} />
		<Redirect from="/bar" to="/foo" />
		<Route render={() => "TEST_404"} />
	</Switch>
)

const createTestMiddleware = (...args) => promisify(createMiddleware(...args))

describe("appMiddleware", () => {
	let middleware, req, res

	beforeEach(() => {
		req = createRequest({
			method: "GET",
			url: "/"
		})
		res = createResponse()
	})

	context("without server-side rendering", () => {
		beforeEach(() => {
			middleware = createTestMiddleware({ rendering: false, Root })
		})

		it("doesn't render Root component", async () => {
			await middleware(req, res)
			res.statusCode.should.eql(200)
			res._getData().should.not.contain(renderToString(<Root />))
		})
	})

	context("with server-side rendering", () => {
		beforeEach(() => {
			middleware = createTestMiddleware({ rendering: true, Root })
		})

		it("renders Root component", async () => {
			await middleware(req, res)
			res.statusCode.should.eql(200)
			res._getData().should.contain(renderToString(<Root />))
		})

		context("with routes", () => {
			beforeEach(() => {
				middleware = createTestMiddleware({ rendering: true, Root: RouterRoot })
			})

			it("renders requested route", async () => {
				req.url = "/foo"
				await middleware(req, res)
				res.statusCode.should.eql(200)
				res._getData().should.contain("TEST_FOO")
			})

			it("handles react-router Redirect", async () => {
				req.url = "/bar"
				await middleware(req, res)
				res.statusCode.should.eql(302)
				res._getRedirectUrl().should.match(/\/foo$/)
			})
		})
	})
})
