import React from "react"
import ReactDOM from "react-dom"
import { Router, browserHistory } from "react-router"
import * as OfflinePlugin from "offline-plugin/runtime"
import { Provider } from "./containers/app"
import routes from "./app/routes"
import sync from "./app/hot"

if(process.env.OFFLINE === "true") {
	OfflinePlugin.install()
}

const appData = JSON.parse(document.getElementById("data").textContent)

ReactDOM.render(
	<Provider data={appData}>
		<Router history={browserHistory}>
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
}
