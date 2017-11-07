import React from "react"
import { StaticRouter } from "react-router-dom"
import { App, Provider } from "../containers/app"
import { renderWith } from "../containers/app/Html"
import Manifest from "./Manifest"

const PUBLIC_PATH = process.env.PUBLIC_PATH || "/"

const defaults = config => ({
	rendering: false,
	data: {},
	Root: App,
	...config
})

/**
 * Application express middleware.
 *
 * @param {Object} config
 * @param {Boolean} config.rendering Enable server-side rendering
 * @param {Boolean} config.data      Application data embedded in [script#data]
 * @param {Object} config.manifest   Webpack generated manifest.json
 * @param {Root} config.Root         Root react component
 */
export default function middleware(config) {
	const {
		rendering,
		data,
		Root
	} = defaults(config)
	const manifest = new Manifest(config.manifest)
	return (req, res, next) => {
		const render = renderWith({ data, manifest })
		if(!rendering) {
			res.send(render())
		} else {
			try {
				const context = {}
				const body = render(
					<Provider data={data}>
						<StaticRouter
							location={req.url}
							context={context}
							basename={PUBLIC_PATH.replace(/\/*$/, "")}>
							<Root />
						</StaticRouter>
					</Provider>
				)
				if(context.url) {
					res.redirect(302, context.url)
				} else {
					res.status(context.status || 200).send(body)
				}
			} catch(error) {
				res.status(500).send(error.message)
			}
		}
		if(next) next()
	}
}
