import React from "react"
import { StaticRouter } from "react-router-dom"
import { App, Provider } from "../containers/app"
import { renderWith } from "../containers/app/Html"
import Manifest from "./Manifest"

const PUBLIC_PATH = process.env.PUBLIC_PATH || "/"

export default function middleware(config) {
	const {
		serverRendering,
		data
	} = config
	const manifest = new Manifest(config.manifest)
	console.log(serverRendering)
	return (req, res, next) => {
		const render = renderWith({ data, manifest })
		if(!serverRendering) {
			res.send(render())
		} else {
			try {
				const context = {}
				const body = render(
					<Provider data={data}>
						<StaticRouter
							url={req.url}
							context={context}
							basename={PUBLIC_PATH.replace(/\/*$/, "")}>
							<App />
						</StaticRouter>
					</Provider>
				)
				console.log(context)
				if(context.url) {
					res.redirect(302, context.url)
				} else {
					res.status(context.status || 200).send(body)
				}
			} catch(error) {
				console.log(error)
				res.status(500).send(error.message)
			}
		}
		if(next) next()
	}
}
