import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { Provider, App } from "../containers/app"

if(process.env.OFFLINE === "true") {
	// eslint-disable-next-line global-require
	require("offline-plugin/runtime").install()
}

const PUBLIC_PATH = process.env.PUBLIC_PATH || "/"

const appData = JSON.parse(document.getElementById("data").textContent)

const root = document.getElementById("app")

function render(hydrate = false) {
	const component = (
		<Provider data={appData}>
			<BrowserRouter basename={PUBLIC_PATH}>
				<App />
			</BrowserRouter>
		</Provider>
	)
	if(hydrate) ReactDOM.hydrate(component, root)
	else ReactDOM.render(component, root)
}

render(root.dataset.ssr && root.dataset.ssr !== "false")

if(module.hot) {
	module.hot.accept(() => render())
}
