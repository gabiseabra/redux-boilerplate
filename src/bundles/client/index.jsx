import React from "react"
import ReactDOM from "react-dom"
import { useBasename } from "history"
import { Router, browserHistory } from "react-router"
import { Provider } from "../../containers/app"
import routes from "../../containers/routes"
import sync from "./hmr"

if(process.env.OFFLINE === "true") {
	require("offline-plugin/runtime").install()
}

const PUBLIC_PATH = process.env.PUBLIC_PATH || "/"

const appData = JSON.parse(document.getElementById("data").textContent)

const history = useBasename(() => browserHistory)({
	basename: PUBLIC_PATH
})

ReactDOM.render(
	<Provider data={appData}>
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
}
