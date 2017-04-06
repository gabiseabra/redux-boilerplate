import path from "path"
import http from "http"
import Express from "express"
import Cookies from "cookies"
import proxy from "express-http-proxy"
import webpack from "webpack"
import hotMiddleware from "webpack-hot-middleware"
import devMiddleware from "webpack-dev-middleware"
import appMiddleware from "../src/app/middleware"
import { apiUrl } from "../src/lib/ApiClient"
import config from "../config/app.json"
import profile from "../config/data.json"
import webpackConfig, { manifest } from "./bundles/client.babel"

const HMR = config.hotModuleReplacement

const port = config.devPort || 8080

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
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			"process.env.HMR": true
		})
	)
	webpackConfig.entry.unshift(
		"react-hot-loader/patch",
		"webpack-hot-middleware/client?reload=true"
	)
}

const compiler = webpack(webpackConfig)

const app = new Express()

const server = http.Server(app)

app.use(Cookies.connect())

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

if(config.api.proxy) {
	app.use(config.api.proxy, proxy(apiUrl(config.api)))
}

app.use(appMiddleware({
	serverRendering: false,
	data: config.app,
	api: config.api,
	manifest,
	profile
}))

server.listen(port, err => {
	if(err) {
		console.error(err)
	}
	console.info("==> 💻 Development server running @ http://%s:%s", config.host, port)
	console.info("==> 🔥 Hot module replacement is %s", (HMR ? "enabled" : "disabled"))
})
