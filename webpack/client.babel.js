/**
 * Client bundle configuration file
 */
import webpack from "webpack"
import merge from "webpack-merge"
import ManifestPlugin from "webpack-manifest-plugin"
import config from "./config"

export default merge.smart(config, {
	target: "web",
	entry: {
		vendor: [
			"babel-polyfill",
			"react",
			"react-dom",
			"react-helmet",
			"react-router"
		],
		app: "./src/client.jsx"
	},
	output: {
		path: "./public/dist"
	},
	plugins: [
		new ManifestPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			names: [ "vendor", "manifest" ]
		})
	]
})
