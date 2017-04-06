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
import createStore from "./redux/store"
import createSaga from "./redux/saga"

OfflinePlugin.install()

const apiConfig = JSON.parse(document.getElementById("api").textContent)

const appData = JSON.parse(document.getElementById("data").textContent)

const profile = JSON.parse(document.getElementById("profile").textContent)

const store = createStore(Cookie, window.__state) // eslint-disable-line no-underscore-dangle

const history = syncHistoryWithStore(browserHistory, store)

const apiClient = new ApiClient(apiConfig)

let task = store.runSaga(createSaga(apiClient))

ReactDOM.render(
	<Provider data={appData} profile={profile} store={store}>
		<Router history={history}>
			{routes}
		</Router>
	</Provider>,
	document.getElementById("app")
)

if(process.env.HMR && module.hot) {
	// eslint-disable-next-line no-underscore-dangle
	sync(window.__webpack_hot_middleware_reporter__)

	module.hot.accept("./redux/saga", () => {
		task.cancel()
		task = store.runSaga(createSaga(apiClient))
	})
}
