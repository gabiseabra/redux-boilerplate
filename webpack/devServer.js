import path from "path"
import http from "http"
import Express from "express"
import proxy from "express-http-proxy"
import webpack from "webpack"
import devMiddleware from "webpack-dev-middleware"
import appMiddleware from "../src/app/middleware"
import config from "../config/app.json"
import profile from "../config/data.json"
import webpackConfig from "./client.babel"

const port = config.devPort || 8080;

const apiHost = config.apiHost || "localhost"

const apiPort = config.apiPort || 3002

const apiUrl = `${apiHost}:${apiPort}`

const serverOptions = {
	contentBase: `http://${config.host}:${port}`,
	publicPath: webpackConfig.output.publicPath,
	quiet: true,
	noInfo: true,
	inline: true,
	headers: {
		"Access-Control-Allow-Origin": "*"
	},
	stats: {
		colors: true
	}
}

const compiler = webpack(webpackConfig)

const app = new Express()

const server = http.Server(app)

app.use(devMiddleware(compiler, serverOptions))

app.use(Express.static(path.join(__dirname, "../public")))

app.use("/api", proxy(apiUrl))

app.use(appMiddleware({
	serverRendering: false,
	data: config.app,
	apiUrl,
	profile
}))

server.listen(port, err => {
	if(err) {
		console.error(err);
	}
	console.info("==> 💻 Development server running @ http://%s:%s", config.host, port)
})
