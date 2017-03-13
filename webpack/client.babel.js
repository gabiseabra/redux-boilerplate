/**
 * Client bundle configuration file
 */
import path from "path"
import webpack from "webpack"
import merge from "webpack-merge"
import OfflinePlugin from "offline-plugin"
import FontelloPlugin from "fontello-webpack-plugin"
import config from "./config"

export default merge.smart(config, {
	target: "web",
	entry: [
		"babel-polyfill",
		"./src/client.jsx"
	],
	output: {
		path: path.join(__dirname, "../public/dist"),
		publicPath: "/dist/"
	},
	plugins: [
		new FontelloPlugin({
			config: require("../src/css/fontello.json")
		}),
		new webpack.DllReferencePlugin({
			manifest: require("../public/dist/react.manifest.json")
		}),
		new webpack.optimize.CommonsChunkPlugin("common"),
		new OfflinePlugin({
			externals: [
				"/favicon.ico",
				"/icon.png",
				"/manifest.json",
				"/dist/react.dll.js"
			]
		})
	]
})
