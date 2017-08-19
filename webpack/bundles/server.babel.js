import path from "path"
import merge from "webpack-merge"
import nodeExternals from "webpack-node-externals"
import config, { loaders } from "../config"

export default merge.smart(config, {
	target: "node",
	entry: [
		"babel-polyfill",
		"./src/bundles/server"
	],
	externals: [
		/\.json$/,
		nodeExternals()
	],
	output: {
		path: path.join(__dirname, "../../dist"),
		filename: "server.js",
		libraryTarget: "commonjs"
	},
	module: {
		rules: loaders()
	},
	node: {
		__dirname: true
	}
})
