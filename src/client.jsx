import React from "react"
import ReactDOM from "react-dom"
import { Router, browserHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import * as OfflinePlugin from "offline-plugin/runtime"
import Provider from "./app/Provider"
import ApiClient from "./lib/ApiClient"
import routes from "./app/routes"
import createStore from "./redux/store"
import createSaga from "./redux/saga"

OfflinePlugin.install()

const apiConfig = JSON.parse(document.getElementById("api").textContent)

const appData = JSON.parse(document.getElementById("data").textContent)

const profile = JSON.parse(document.getElementById("profile").textContent)

const store = createStore(window.__state)

const history = syncHistoryWithStore(browserHistory, store)

store.runSaga(createSaga(new ApiClient(apiConfig)))

ReactDOM.render(
	<Provider data={appData} profile={profile} store={store}>
		<Router history={history}>
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
