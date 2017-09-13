import React from "react"
import ReactDOM from "react-dom"
import { useBasename } from "history"
import { Router, browserHistory } from "react-router"
import { syncHistoryWithStore } from "react-router-redux"
import Cookie from "js-cookie"
import ApiClient from "../../lib/ApiClient"
import { Provider } from "../../containers/app"
import routes from "../../containers/routes"
import sync from "./hmr"
import createStore from "../../redux/store"
import createSaga from "../../redux/saga"

if(process.env.OFFLINE === "true") {
	require("offline-plugin/runtime").install()
}

const PUBLIC_PATH = process.env.PUBLIC_PATH || "/"

const appData = JSON.parse(document.getElementById("data").textContent)

const store = createStore(Cookie, window.__state) // eslint-disable-line no-underscore-dangle

const history = syncHistoryWithStore(
	useBasename(() => browserHistory)({ basename: PUBLIC_PATH }),
	store
)

const apiClient = new ApiClient()

let task = store.runSaga(createSaga(apiClient))

ReactDOM.render(
	<Provider data={appData} store={store}>
		<Router history={history}>
			{routes}
		</Router>
	</Provider>,
	document.getElementById("app")
)

if(process.env.NODE_ENV === "development") {
	window.Perf = require("react-addons-perf")
}

if(module.hot) {
	// eslint-disable-next-line no-underscore-dangle
	sync(window.__webpack_hot_middleware_reporter__)

	module.hot.accept("../../redux/saga", () => {
		task.cancel()
		task = store.runSaga(createSaga(apiClient))
	})
}
