import React from "react"
import ReactDOM from "react-dom"
import { createBrowserHistory as createHistory } from "history"
import { ConnectedRouter } from "react-router-redux"
import ApiClient from "../lib/ApiClient"
import { Provider } from "../containers/shared"
import App from "../containers/app/App"
import createStore from "../redux/store"
import createSaga from "../redux/saga"

if(process.env.OFFLINE === "true") {
	// eslint-disable-next-line global-require
	require("offline-plugin/runtime").install()
}

const PUBLIC_PATH = process.env.PUBLIC_PATH || "/"

const appData = JSON.parse(document.getElementById("data").textContent)

const store = createStore(window.__state) // eslint-disable-line no-underscore-dangle

const history = createHistory({ basename: PUBLIC_PATH })

const apiClient = new ApiClient()

let task = store.runSaga(createSaga({ apiClient }))

const root = document.getElementById("app")

function render(hydrate = false) {
	const component = (
		<Provider data={appData} store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>
	)
	if(hydrate) ReactDOM.hydrate(component, root)
	else ReactDOM.render(component, root)
}

render(root.dataset.ssr && root.dataset.ssr !== "false")

if(module.hot) {
	module.hot.accept("../redux/saga", () => {
		task.cancel()
		task = store.runSaga(createSaga(apiClient))
	})
	module.hot.accept(() => render())
}
