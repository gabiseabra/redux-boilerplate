import React from "react"
import { match, RouterContext } from "react-router"
import { render as renderFn } from "./Html"
import Provider from "./Provider"
import ApiClient from "../lib/ApiClient"
import createStore from "../redux/store"
import createSaga from "../redux/saga"
import Manifest from "../lib/Manifest"

export default function middleware(config) {
	const {
		api,
		serverRendering,
		manifest,
		routes,
		data,
		profile
	} = config;
	const saga = createSaga(new ApiClient(api));
	const render = renderFn.bind(
		undefined,
		data,
		profile,
		new Manifest(manifest),
		api.proxy ? api.proxy : api
	);
	return (req, res, next) => {
		if(!serverRendering) {
			res.send(render());
		} else {
			const store = createStore();
			match({ routes, location: req.url }, (err, redirect, props) => {
				if(err) {
					res.status(500).send(err.message);
				} else if(redirect) {
					res.redirect(302, redirect.pathname + redirect.search);
				} else if(props) {
					const component = (
						<Provider data={data} profile={profile} store={store}>
							<RouterContext {...props} />
						</Provider>
					);
					store.runSaga(saga).done
						.then(() => res.status(200).send(render(store, component)))
						.catch(e => res.status(500).send(e.message))
						.then(next)
					render(store, component);
					store.close();
				} else {
					res.status(404).send("Not found");
				}
			});
		}
		// next();
	}
}
