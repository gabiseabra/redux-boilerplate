import React from "react"
import { Route, Switch } from "react-router-dom"
import {
	Shell,
	Home,
	Hello,
	Feed,
	Post,
	NotFound
} from "../views"

const App = () => (
	<Shell>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/hello" component={Hello} />
			<Route exact path="/posts" component={Feed} />
			<Route exact path="/posts/:id" component={Post} />
			<Route component={NotFound} />
		</Switch>
	</Shell>
)

export default App
