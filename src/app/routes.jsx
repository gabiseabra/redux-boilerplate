import React from "react"
import { Route, IndexRoute } from "react-router"
import {
	Shell,
	HomePage,
	HelloPage,
	NotFound
} from "../containers/views"

export default (
	<Route path="/" component={Shell}>
		<IndexRoute component={HomePage} />
		<Route path="hello" component={HelloPage} />
		<Route path="*" component={NotFound} status={404} />
	</Route>
)
