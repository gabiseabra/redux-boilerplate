import React from "react"
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
			middleware = createMiddleware({ rendering: false, Root })
		})

		it("doesn't render Root component", () => {
			middleware(req, res)
			res.statusCode.should.eql(200)
			res._getData().should.not.contain(renderToString(<Root />))
		})
	})

	context("with server-side rendering", () => {
		beforeEach(() => {
			middleware = createMiddleware({ rendering: true, Root })
		})

		it("renders Root component", () => {
			middleware(req, res)
			res.statusCode.should.eql(200)
			res._getData().should.contain(renderToString(<Root />))
		})

		context("with routes", () => {
			beforeEach(() => {
				middleware = createMiddleware({ rendering: true, Root: RouterRoot })
			})

			it("renders requested route", () => {
				req.url = "/foo"
				middleware(req, res)
				res.statusCode.should.eql(200)
				res._getData().should.contain("TEST_FOO")
			})

			it("handles react-router Redirect", () => {
				req.url = "/bar"
				middleware(req, res)
				res.statusCode.should.eql(302)
				res._getRedirectUrl().should.eql("/foo")
			})
		})
	})
})
