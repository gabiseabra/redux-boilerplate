import path from "path"
import merge from "webpack-merge"
import nodeExternals from "webpack-node-externals"
import appExternals from "../config/externals"
import config, { loaders, context } from "../config"

export default merge.smart(config, {
	target: "node",
	entry: [
		"babel-polyfill",
		"./src/bundles/server"
	],
	externals: [
		appExternals(context),
		nodeExternals()
	],
	output: {
		path: path.join(context, "dist"),
		filename: "server.js",
		libraryTarget: "commonjs"
	},
	module: {
		rules: loaders()
	},
	node: {
		__dirname: false
	}
})
