import React from "react"
import ReactDOM from "react-dom"
import { Router, browserHistory } from "react-router"
import * as OfflinePlugin from "offline-plugin/runtime"
import Provider from "./app/Provider"
import routes from "./app/routes"

OfflinePlugin.install()

const appData = JSON.parse(document.getElementById("data").textContent)

const profile = JSON.parse(document.getElementById("profile").textContent)

ReactDOM.render(
	<Provider data={appData} profile={profile}>
		<Router history={browserHistory}>
			{routes}
		</Router>
	</Provider>,
	document.getElementById("app")
)

if(module.hot) {
	const reporter = window.__webpack_hot_middleware_reporter__
	const next = reporter.success
	const DEAD_TIMEOUT = 2000

	reporter.success = function () {
		document.querySelectorAll("link[href][rel=stylesheet]").forEach((link) => {
			const href = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
			const newLink = link.cloneNode()
			newLink.href = href
			link.parentNode.appendChild(newLink)
			setTimeout(() => {
				if(link.parentNode) {
					link.parentNode.removeChild(link)
				}
			}, DEAD_TIMEOUT)
			next()
		})
	}
	module.hot.accept()
}
