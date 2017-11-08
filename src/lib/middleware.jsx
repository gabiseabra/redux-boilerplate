import React from "react"
import { StaticRouter } from "react-router-dom"
import { App, Provider } from "../containers/app"
import { renderWith } from "../containers/app/Html"
import ApiClient from "./ApiClient"
import Manifest from "./Manifest"
import createStore from "../redux/store"
import createSaga from "../redux/saga"

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
	const render = renderWith({ data, manifest })
	return (req, res, next) => {
		if(!rendering) {
			res.send(render())
		} else {
			const saga = createSaga(new ApiClient())
			const store = createStore()
			const context = {}
			const body = render(
				<Provider data={data} store={store}>
					<StaticRouter
						location={req.url}
						context={context}
						basename={PUBLIC_PATH.replace(/\/*$/, "")}>
						<Root />
					</StaticRouter>
				</Provider>,
				store
			)
			store.runSaga(saga).done
				.then(() => {
					if(context.url) {
						res.redirect(302, context.url)
					} else {
						res.status(context.status || 200).send(body)
					}
				})
				.then(next)
				.catch(error => res.status(500).send(error.message))
			store.close()
			return
		}
		if(next) next()
	}
}
