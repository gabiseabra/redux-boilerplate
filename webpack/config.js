/**
 * Base Webpack configuration file
 */
import path from "path"
import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"

const env = process.env.NODE_ENV || "development"

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
				include: [
					path.join(__dirname, "../src"),
					path.join(__dirname, "../api")
				],
				loader: "babel-loader"
			},
			{
				test: /\.css?$/,
				include: [ path.join(__dirname, "../src") ],
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader",
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: (
									env === "production" ?
									"[hash:base64:5]" :
									"[name]_[local]--[hash:base64:5]"
								)
							}
						},
						{ loader: "postcss-loader" }
					]
				})
			},
			{
				test: /\.(jpe?g|png|svg)?$/,
				use: [
					{ loader: "file-loader", options: { name: "[path][name].[ext]?[hash]" } }
				]
			}
		]
	},
	resolve: {
		extensions: [ ".js", ".jsx" ]
	},
	plugins
}
