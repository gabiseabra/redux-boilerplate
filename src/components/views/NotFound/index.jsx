import React from "react"
import Helmet from "react-helmet"

export default function NotFound() {
	return (
		<section>
			<Helmet title="Not Found" />
			<h1>404</h1>
			<p>The page you have requested does not exist.</p>
		</section>
	)
}
