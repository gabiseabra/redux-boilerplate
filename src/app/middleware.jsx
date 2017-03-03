import React from "react"
import { match, RouterContext } from "react-router"
import { render } from "./Html"
import Provider from "./Provider"

export default function middleware(config) {
	const {
		serverRendering,
		routes,
		store,
		data,
		profile
	} = config;
	return (req, res, next) => {
		if(!serverRendering) {
			res.send(render(data, profile));
		} else {
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
					res.status(200).send(render(data, profile, component));
				} else {
					res.status(404).send("Not found");
				}
			});
		}
		next();
	}
}
