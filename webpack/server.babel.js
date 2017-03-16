/**
 * Server bundle configuration file
 */
import path from "path"
import merge from "webpack-merge"
import nodeExternals from "webpack-node-externals"
import config from "./config"

export default merge.smart(config, {
	target: "node",
	entry: [
		"babel-polyfill",
		"./src/server.jsx"
	],
	externals: [
		/\.json$/,
		nodeExternals()
	],
	output: {
		path: path.join(__dirname, "../dist"),
		filename: "server.js",
		libraryTarget: "commonjs"
	},
	node: {
		__dirname: true
	}
})
