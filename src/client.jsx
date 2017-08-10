import React from "react"
import ReactDOM from "react-dom"
import { Router, browserHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import * as OfflinePlugin from "offline-plugin/runtime"
import Cookie from "js-cookie"
import Provider from "./app/Provider"
import ApiClient from "./lib/ApiClient"
import routes from "./app/routes"
import sync from "./app/hot"
import DevTools from "./redux/DevTools"
import createStore from "./redux/store"
import createSaga from "./redux/saga"

if(process.env.OFFLINE === "true") {
	OfflinePlugin.install()
}

const apiConfig = JSON.parse(document.getElementById("api").textContent)

const appData = JSON.parse(document.getElementById("data").textContent)

const profile = JSON.parse(document.getElementById("profile").textContent)

const store = createStore(Cookie, window.__state) // eslint-disable-line no-underscore-dangle

const history = syncHistoryWithStore(browserHistory, store)

const apiClient = new ApiClient(apiConfig)

let task = store.runSaga(createSaga(apiClient))

const components = [
	<Router history={history}>
		{routes}
	</Router>
]

// eslint-disable-next-line no-underscore-dangle
if(process.env.NODE_ENV === "development" && !window.__REDUX_DEVTOOLS_EXTENSION__) {
	components.push(<DevTools />)
}

ReactDOM.render(
	<Provider data={appData} profile={profile} store={store}>
		<div>{components}</div>
	</Provider>,
	document.getElementById("app")
)

if(process.env.NODE_ENV === "development") {
	window.Perf = require("react-addons-perf")
}

if(process.env.HMR === "true" && module.hot) {
	// eslint-disable-next-line no-underscore-dangle
	sync(window.__webpack_hot_middleware_reporter__)

	module.hot.accept("./redux/saga", () => {
		task.cancel()
		task = store.runSaga(createSaga(apiClient))
	})
}
