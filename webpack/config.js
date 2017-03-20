/**
 * Base Webpack configuration file
 */
import path from "path"
import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"

const URL_LIMIT = 10000

const env = process.env.NODE_ENV || "development"

const cssOptions = {
	modules: true,
	importLoaders: 1,
	localIdentName: (
		env === "production" ?
		"[hash:base64:5]" :
		"[name]_[local]--[hash:base64:5]"
	)
}

let plugins = [
	new ExtractTextPlugin("main.css"),
	new webpack.EnvironmentPlugin({ NODE_ENV: env })
];

if(env === "production") {
	// Production options
	plugins = plugins.concat([
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: false
		})
	])
} else if(env === "development") {
	// Development options
	plugins = plugins.concat([
		new webpack.NamedModulesPlugin()
	])
}

export default {
	devtool: (env === "production" ? undefined : "inline-source-map"),
	context: path.resolve(__dirname, ".."),
	output: {
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [ path.join(__dirname, "../src") ],
				loader: "babel-loader"
			},
			{
				test: /\.css?$/,
				exclude: [ path.join(__dirname, "../src") ],
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.css?$/,
				include: [ path.join(__dirname, "../src") ],
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
	plugins
}
