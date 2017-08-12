import React from "react"
import { match, RouterContext } from "react-router"
import { Provider, renderWith } from "../containers/app"
import Manifest from "../lib/Manifest"

export default function middleware(config) {
	const {
		serverRendering,
		manifest,
		routes,
		data
	} = config
	const render = renderWith(
		data,
		new Manifest(manifest)
	)
	return (req, res, next) => {
		if(!serverRendering) {
			res.send(render())
		} else {
			match({ routes, location: req.url }, (err, redirect, props) => {
				if(err) {
					res.status(500).send(err.message)
				} else if(redirect) {
					res.redirect(302, redirect.pathname + redirect.search)
				} else if(props) {
					const component = (
						<Provider data={data}>
							<RouterContext {...props} />
						</Provider>
					)
					res.status(200).send(render(component))
				} else {
					res.status(404).send("Not found")
				}
			})
		}
		if(next) next()
	}
}
