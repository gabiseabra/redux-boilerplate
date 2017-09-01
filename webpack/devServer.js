import path from "path"
import http from "http"
import Express from "express"
import webpack from "webpack"
import hotMiddleware from "webpack-hot-middleware"
import devMiddleware from "webpack-dev-middleware"
import appMiddleware from "../src/lib/middleware"
import config from "../config/app.json"
import webpackConfig, { manifest } from "./bundles/client.babel"

const HOST = process.env.HOST || "localhost"
const PORT = process.env.DEV_PORT || process.env.PORT || 3000
const HMR = process.argv.indexOf("--hot") !== -1

const serverOptions = {
	contentBase: `http://${HOST}:${PORT}`,
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

const compiler = webpack(webpackConfig)

const app = new Express()

const server = http.Server(app)

// Webpack dev server only servers files from it's publicPath
// and the service worker should be on the root of the app's scope,
// so rewrite url to make the relative path explicit.
app.get([ "/sw.js", "/appcache/*" ], (req, res, next) => {
	// eslint-disable-next-line no-param-reassign
	req.url = `${serverOptions.publicPath}/..${req.url}`
	next()
})

app.use(devMiddleware(compiler, serverOptions))

if(HMR) {
	app.use(hotMiddleware(compiler))
}

app.use(Express.static(path.join(__dirname, "../public")))

app.use(appMiddleware({
	serverRendering: false,
	data: config,
	manifest
}))

server.listen(PORT, (err) => {
	if(err) {
		console.error(err)
	}
	console.info("==> 💻  Development server running @ http://%s:%s", HOST, PORT)
	console.info("==> 🔥  Hot module replacement is %s", (HMR ? "enabled" : "disabled"))
})
