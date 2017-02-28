import path from "path"
import http from "http"
import Express from "express"
import compression from "compression"
import favicon from "serve-favicon"
import PrettyError from "pretty-error"
import React from "react"
import ReactDOM from "react-dom/server"
import { match, RouterContext } from "react-router"
import routes from "./app/routes"
import Provider from "./app/Provider"
import Html from "./app/Html"
import profile from "../config/data.json"
import configJson from "../config/app.json"

const pretty = new PrettyError();

const env = process.env.NODE_ENV || "development"

const config = Object.assign({}, configJson)
if("env" in configJson && env in configJson.env) {
	Object.assign(config, configJson.env[env])
}

// eslint-disable-next-line prefer-template
const render = component => "<!doctype html>\n" + ReactDOM.renderToStaticMarkup(
	<Html data={config.app} profile={profile}>{component}</Html>
)

const app = new Express()

const server = http.Server(app)

app.use(compression())

app.use(Express.static(path.join(__dirname, "../public")))

app.use(favicon(path.join(__dirname, "../public/favicon.ico")))

app.use((req, res) => {
	if(!config.serverRendering) {
		res.send(render());
		return;
	}
	match({ routes, location: req.url }, (err, redirect, props) => {
		if(err) {
			console.error("!! Router error: %s", pretty.render(err));
			res.status(500).send(err.message);
		} else if(redirect) {
			res.redirect(302, redirect.pathname + redirect.search);
		} else if(props) {
			res.status(200).send(render(
				<Provider data={config.app} profile={profile}>
					<RouterContext {...props} />
				</Provider>
			));
		} else {
			res.status(404).send("Not found");
		}
	});
})

server.listen(config.port, err => {
	if(err) {
		console.error("!! Error: %s", pretty.render(err));
	}
	console.info("==> 💻 Server running @ http://%s:%s", config.host, config.port)
	console.info("==> Server-side rendering is %s", (config.serverRendering ? "enabled" : "disabled"))
})
