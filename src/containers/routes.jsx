import React from "react"
import { Route, IndexRoute } from "react-router"
import {
	Shell,
	Home,
	Hello,
	Feed,
	Post,
	NotFound
} from "./views"

export default (
	<Route path="/" component={Shell}>
		<IndexRoute component={Home} />
		<Route path="hello" component={Hello} />
		<Route path="posts" component={Feed} />
		<Route path="posts/:id" component={Post} />
		<Route path="*" component={NotFound} status={404} />
	</Route>
)
