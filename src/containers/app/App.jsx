import React from "react"
import { Route, Switch } from "react-router-dom"
import {
	Shell,
	Home,
	Hello,
	NotFound
} from "../views"

const App = () => (
	<Shell>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/hello" component={Hello} />
			<Route component={NotFound} />
		</Switch>
	</Shell>
)

export default App
