import React from "react"
import { match, RouterContext } from "react-router"
import { render as renderFn } from "./Html"
import Provider from "./Provider"
import ApiClient from "../lib/ApiClient"
import createStore from "../redux/store"
import createSaga from "../redux/saga"
import Manifest from "../lib/Manifest"

export default function middleware(config) {
	let manifest;
	const {
		apiUrl,
		serverRendering,
		routes,
		data,
		profile
	} = config;
	const saga = createSaga(new ApiClient(`http://${apiUrl}`));
	const render = renderFn.bind(
		undefined,
		data,
		profile
	);
	return (req, res, next) => {
		if(!manifest) {
			manifest = new Manifest(
				require("../../public/dist/manifest.dll.json"),
				require("../../public/dist/manifest.json")
			)
		}
		if(!serverRendering) {
			res.send(render(manifest));
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
						.then(() => res.status(200).send(render(manifest, store, component)))
						.catch(e => res.status(500).send(e.message))
						.then(next)
					render(manifest, store, component);
					store.close();
				} else {
					res.status(404).send("Not found");
				}
			});
		}
		// next();
	}
}
