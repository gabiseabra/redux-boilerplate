/**
 * Client bundle configuration file
 */
import path from "path"
import webpack from "webpack"
import merge from "webpack-merge"
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
		new webpack.DllReferencePlugin({
			manifest: require("../public/dist/react.manifest.json")
		}),
		new webpack.optimize.CommonsChunkPlugin("common")
	]
})
