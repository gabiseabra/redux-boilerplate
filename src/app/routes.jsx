import React from "react"
import { Route, IndexRoute } from "react-router"
import {
	App,
	Home,
	Hello,
	Feed,
	Post,
	NotFound
} from "../containers"

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="hello" component={Hello} />
		<Route path="posts" component={Feed} />
		<Route path="posts/:name" component={Post} />
		<Route path="*" component={NotFound} status={404} />
	</Route>
)
