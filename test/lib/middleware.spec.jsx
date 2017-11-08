import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { renderToString } from "react-dom/server"
import { apiClient, middleware } from "./context"

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
	before(apiClient())
	beforeEach(middleware({ rendering: false, Root }))

	context("without server-side rendering", () => {
		beforeEach(async function () {
			const { res } = await this.middleware.run()
			this.res = res
		})

		it("doesn't render Root component", function () {
			this.res.statusCode.should.eql(200)
			this.res._getData().should.not.contain(renderToString(<Root />))
		})
	})

	context("with server-side rendering", () => {
		beforeEach(middleware({ rendering: true, Root }))

		it("renders Root component", async function () {
			const { res } = await this.middleware.run()
			res.statusCode.should.eql(200)
			res._getData().should.contain(renderToString(<Root />))
		})

		context("with routes", () => {
			beforeEach(middleware({ rendering: true, Root: RouterRoot }))

			it("renders requested route", async function () {
				const { res } = await this.middleware.run({ path: "/foo" })
				res.statusCode.should.eql(200)
				res._getData().should.contain("TEST_FOO")
			})

			it("handles react-router Redirect", async function () {
				const { res } = await this.middleware.run({ path: "/bar" })
				res.statusCode.should.eql(302)
				res._getRedirectUrl().should.match(/\/foo$/)
			})
		})
	})
})
