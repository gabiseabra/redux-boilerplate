import React from "react"
import ReactDOM from "react-dom"
import { Router, browserHistory } from "react-router"
import Provider from "./app/Provider"
import ApiClient from "./lib/ApiClient"
import routes from "./app/routes"
import createStore from "./redux/store"
import createSaga from "./redux/saga"

const client = new ApiClient("/api")

const appData = JSON.parse(document.getElementById("data").textContent)

const profile = JSON.parse(document.getElementById("profile").textContent)

const store = createStore(window.__state)

store.runSaga(createSaga(client))

ReactDOM.render(
	<Provider data={appData} profile={profile} store={store}>
		<Router history={browserHistory}>
			{routes}
		</Router>
	</Provider>,
	document.getElementById("app")
)
