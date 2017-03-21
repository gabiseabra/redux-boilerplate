import path from "path"
import http from "http"
import Express from "express"
import proxy from "express-http-proxy"
import webpack from "webpack"
import hotMiddleware from "webpack-hot-middleware"
import devMiddleware from "webpack-dev-middleware"
import appMiddleware from "../src/app/middleware"
import { apiUrl } from "../src/lib/ApiClient"
import config from "../config/app.json"
import profile from "../config/data.json"
import webpackConfig, { manifestCache } from "./client.babel"

const HMR = config.hotModuleReplacement

const port = config.devPort || 8080;

const serverOptions = {
	contentBase: `http://${config.host}:${port}`,
	publicPath: webpackConfig.output.publicPath,
	hot: true,
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


if(HMR) {
	webpackConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)

	webpackConfig.entry.unshift(
		"react-hot-loader/patch",
		"webpack-hot-middleware/client?reload=true"
	)
}

const compiler = webpack(webpackConfig)

const app = new Express()

const server = http.Server(app)

app.use(devMiddleware(compiler, serverOptions))

if(HMR) {
	app.use(hotMiddleware(compiler))
}

app.use(Express.static(path.join(__dirname, "../public")))

if(config.api.proxy) {
	app.use(config.api.proxy, proxy(apiUrl(config.api)))
}

app.use(appMiddleware({
	serverRendering: false,
	data: config.app,
	api: config.api,
	manifest: manifestCache,
	profile
}))

server.listen(port, err => {
	if(err) {
		console.error(err);
	}
	console.info("==> 💻 Development server running @ http://%s:%s", config.host, port)
})
