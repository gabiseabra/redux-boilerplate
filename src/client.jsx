import React from "react"
import ReactDOM from "react-dom"
import { Router, browserHistory } from "react-router"
import Provider from "./app/Provider"
import routes from "./app/routes"
import createStore from "./redux/store"
import saga from "./redux/saga"

const appData = JSON.parse(document.getElementById("data").textContent)

const profile = JSON.parse(document.getElementById("profile").textContent)

const store = createStore(window.__state)

store.runSaga(saga)

ReactDOM.render(
	<Provider data={appData} profile={profile} store={store}>
		<Router history={browserHistory}>
			{routes}
		</Router>
	</Provider>,
	document.getElementById("app")
)
