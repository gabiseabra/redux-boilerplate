/**
 * Base Webpack configuration file
 */
import path from "path"
import merge from "webpack-merge"
import ExtractTextPlugin from "extract-text-webpack-plugin"

const URL_LIMIT = 10000

const context = path.resolve(__dirname, "..", "..")

const cssOptions = {
	modules: true,
	importLoaders: 1
}

let envConfig = {}

try {
	if(process.env.NODE_ENV) {
		// eslint-disable-next-line
		const module = require(`./${process.env.NODE_ENV}`)
		envConfig = module.default
		cssOptions.localIdentName = module.CSS_MODULE_NAME
	}
} catch(e) { /* No environment config */ }

export default merge.smart({
	context,
	output: {
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [
					path.join(context, "src"),
					path.join(context, "api")
				],
				loader: "babel-loader"
			},
			{
				test: /\.css?$/,
				exclude: [ path.join(context, "src") ],
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.css?$/,
				include: [ path.join(context, "src") ],
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{ loader: "css-loader", options: cssOptions },
						{ loader: "postcss-loader" }
					]
				})
			},
			{
				test: /\.scss?$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{ loader: "css-loader", options: cssOptions },
						{ loader: "sass-loader" }
					]
				})
			},
			{
				test: /\.less?$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{ loader: "css-loader", options: cssOptions },
						{ loader: "less-loader" }
					]
				})
			},
			{
				test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader",
				options: {
					limit: URL_LIMIT,
					mimetype: "application/font-woff"
				}
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader",
				options: {
					limit: URL_LIMIT,
					mimetype: "application/octet-stream"
				}
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url-loader",
				options: {
					limit: URL_LIMIT,
					mimetype: "image/svg+xml"
				}
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader"
			},
			{
				test: /\.(jpe?g|png|gifv?)?$/,
				loader: "url-loader",
				options: {
					limit: URL_LIMIT
				}
			}
		]
	},
	resolve: {
		extensions: [ ".js", ".jsx" ]
	},
	plugins: [
		new ExtractTextPlugin("main.css")
	]
}, envConfig)
