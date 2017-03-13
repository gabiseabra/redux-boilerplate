/**
 * Client bundle configuration file
 */
import path from "path"
import webpack from "webpack"
import merge from "webpack-merge"
import OfflinePlugin from "offline-plugin"
import FontelloPlugin from "fontello-webpack-plugin"
import ManifestPlugin from "webpack-manifest-plugin"
import config from "./config"
import vendorConfig from "./vendor.babel"

const vendors = Object.keys(vendorConfig.entry).map(module => `/dist/${module}.manifest.json`)

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
		new ManifestPlugin({
			fileName: "manifest.json",
			publicPath: "dist/"
		}),
		new FontelloPlugin({
			config: require("../src/css/fontello.json")
		}),
		new webpack.optimize.CommonsChunkPlugin("common"),
		new OfflinePlugin({
			externals: [
				"/favicon.ico",
				"/icon.png",
				"/manifest.json",
				...vendors
			]
		}),
		...(vendors.map(fileName => (
			new webpack.DllReferencePlugin({
				manifest: require(`../public/${fileName}`)
			})
		)))
	]
})
