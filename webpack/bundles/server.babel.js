/**
 * Server bundle configuration file
 */
import path from "path"
import merge from "webpack-merge"
import nodeExternals from "webpack-node-externals"
import config, { loaders } from "../config"

export default merge.smart(config, {
	target: "node",
	entry: {
		server: [
			"babel-polyfill",
			"./src/server.jsx"
		],
		api: "./api/server.js"
	},
	externals: [
		/\.json$/,
		nodeExternals()
	],
	output: {
		path: path.join(__dirname, "../../dist"),
		filename: "[name].js",
		libraryTarget: "commonjs"
	},
	module: {
		rules: loaders()
	},
	node: {
		__dirname: true
	}
})
