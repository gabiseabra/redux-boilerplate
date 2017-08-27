import React from "react"
import { match, RouterContext } from "react-router"
import { Provider, renderWith } from "../containers/app"
import ApiClient from "./ApiClient"
import Manifest from "./Manifest"
import createStore from "../redux/store"
import createSaga from "../redux/saga"
import { getStatus } from "../redux/selectors"

export default function middleware(config) {
	const {
		serverRendering,
		manifest,
		routes,
		data
	} = config
	const apiUrl = config.apiUrl || "/api"
	const render = renderWith({
		data,
		apiUrl,
		manifest: new Manifest(manifest)
	})
	return (req, res, next) => {
		if(!serverRendering) {
			res.send(render())
		} else {
			const saga = createSaga(new ApiClient(apiUrl))
			const store = createStore(res.cookies)
			match({ routes, location: req.url }, (err, redirect, props) => {
				if(err) {
					res.status(500).send(err.message)
				} else if(redirect) {
					res.redirect(302, redirect.pathname + redirect.search)
				} else if(props) {
					const component = (
						<Provider data={data} store={store}>
							<RouterContext {...props} />
						</Provider>
					)
					store.runSaga(saga).done
						.then(() => {
							const statusCode = getStatus(store.getState()).code
							res.status(statusCode).send(render(component, store))
						})
						.catch(e => res.status(500).send(e.message))
						.then(next)
					render(component, store)
					store.close()
				} else {
					res.status(404).send("Not found")
				}
			})
		}
		// if(next) next()
	}
}
