import path from "path"
import http from "http"
import Express from "express"
import proxy from "express-http-proxy"
import Cookies from "cookies"
import compression from "compression"
import favicon from "serve-favicon"
import manifest from "manifest.json"
import config from "config/app.json"
import appMiddleware from "../../lib/middleware"
import routes from "../../containers/routes"

const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || 80
const API_HOST = process.env.API_HOST || HOST
const API_PORT = process.env.API_PORT || 8080
const API_URL = `${API_HOST}:${API_PORT}`
const SSR = process.env.SSR === "true"

const app = new Express()

const server = http.Server(app)

app.use(Cookies.connect(/* keys */))

app.use(compression())

app.use(Express.static(path.join(__dirname, "../public")))

app.use(favicon(path.join(__dirname, "../public/favicon.ico")))

app.use("/api", proxy(API_URL))

app.use(appMiddleware({
	serverRendering: SSR,
	data: config,
	routes,
	manifest
}))

server.listen(PORT, (err) => {
	if(err) {
		console.error(err)
	}
	console.info("==> 💻  Server running @ http://%s:%s", HOST, PORT)
	console.info("==> Server-side rendering is %s", (SSR ? "enabled" : "disabled"))
})
