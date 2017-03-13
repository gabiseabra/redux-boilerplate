import React from "react"
import { match, RouterContext } from "react-router"
import { render as renderFn } from "./Html"
import Provider from "./Provider"
import Manifest from "../lib/Manifest"

export default function middleware(config) {
	let manifest;
	const {
		serverRendering,
		routes,
		data,
		profile
	} = config;
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
			match({ routes, location: req.url }, (err, redirect, props) => {
				if(err) {
					res.status(500).send(err.message);
				} else if(redirect) {
					res.redirect(302, redirect.pathname + redirect.search);
				} else if(props) {
					const component = (
						<Provider data={data} profile={profile}>
							<RouterContext {...props} />
						</Provider>
					);
					res.status(200).send(render(manifest, component));
				} else {
					res.status(404).send("Not found");
				}
			});
		}
		next();
	}
}
