import path from "path"
import http from "http"
import Express from "express"
import proxy from "express-http-proxy"
import Cookies from "cookies"
import compression from "compression"
import favicon from "serve-favicon"
import appMiddleware from "./app/middleware"
import routes from "./app/routes"
import { apiUrl } from "./lib/ApiClient"
import profile from "../config/data.json"
import config from "../config/app.json"
import manifest from "../public/dist/manifest.json"

const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || 80
const SSR = process.env.SSR === "true"

const app = new Express()

const server = http.Server(app)

app.use(Cookies.connect(/* keys */))

app.use(compression())

app.use(Express.static(path.join(__dirname, "../public")))

app.use(favicon(path.join(__dirname, "../public/favicon.ico")))

if(config.api.proxy) {
	app.use(config.api.proxy, proxy(apiUrl(config.api)))
}

app.use(appMiddleware({
	serverRendering: SSR,
	data: config.app,
	api: config.api,
	routes,
	profile,
	manifest
}))

server.listen(PORT, err => {
	if(err) {
		console.error(err)
	}
	console.info("==> 💻  Server running @ http://%s:%s", HOST, PORT)
	console.info("==> Server-side rendering is %s", (SSR ? "enabled" : "disabled"))
})
