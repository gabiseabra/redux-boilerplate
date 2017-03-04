import React from "react"
import { match, RouterContext } from "react-router"
import { render } from "./Html"
import Provider from "./Provider"
import ApiClient from "../lib/ApiClient"
import createStore from "../redux/store"
import createSaga from "../redux/saga"

export default function middleware(config) {
	const {
		apiUrl,
		serverRendering,
		routes,
		data,
		profile
	} = config;
	const saga = createSaga(new ApiClient(`http://${apiUrl}`));
	return (req, res, next) => {
		if(!serverRendering) {
			res.send(render(data, profile));
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
						.then(() => res.status(200).send(render(data, profile, store, component)))
						.catch(e => res.status(500).send(e.message));
					render(data, profile, store, component);
					store.close();
				} else {
					res.status(404).send("Not found");
				}
			});
		}
		// next();
	}
}
