import React from "react"
import { Route, IndexRoute } from "react-router"
import {
	Shell,
	Home,
	Hello,
	NotFound
} from "../containers/views"

export default (
	<Route path="/" component={Shell}>
		<IndexRoute component={Home} />
		<Route path="hello" component={Hello} />
		<Route path="*" component={NotFound} status={404} />
	</Route>
)
