import path from "path"
import http from "http"
import Express from "express"
import compression from "compression"
import favicon from "serve-favicon"
import proxy from "express-http-proxy"
import appMiddleware from "./app/middleware"
import routes from "./app/routes"
import profile from "../config/data.json"
import config from "../config/app.json"

const apiHost = config.apiHost || "localhost"

const apiPort = config.apiPort || 3002

const apiUrl = `${apiHost}:${apiPort}`

const app = new Express()

const server = http.Server(app)

app.use(compression())

app.use(Express.static(path.join(__dirname, "../public")))

app.use(favicon(path.join(__dirname, "../public/favicon.ico")))

app.use("/api", proxy(apiUrl))

app.use(appMiddleware({
	serverRendering: config.serverRendering,
	data: config.app,
	apiUrl,
	routes,
	profile
}))

server.listen(config.port, err => {
	if(err) {
		console.error(err);
	}
	console.info("==> 💻 Server running @ http://%s:%s", config.host, config.port)
	console.info("==> Server-side rendering is %s", (config.serverRendering ? "enabled" : "disabled"))
})
