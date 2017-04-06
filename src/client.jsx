import React from "react"
import ReactDOM from "react-dom"
import { Router, browserHistory } from "react-router"
import * as OfflinePlugin from "offline-plugin/runtime"
import Provider from "./app/Provider"
import routes from "./app/routes"
import sync from "./app/hot"

if(process.env.OFFLINE) {
	OfflinePlugin.install()
}

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

if(process.env.HMR && module.hot) {
	// eslint-disable-next-line no-underscore-dangle
	sync(window.__webpack_hot_middleware_reporter__)
}
