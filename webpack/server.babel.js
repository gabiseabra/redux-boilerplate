/**
 * Server bundle configuration file
 */
import merge from "webpack-merge"
import nodeExternals from "webpack-node-externals"
import config from "./config"

export default merge.smart(config, {
	target: "node",
	entry: "./src/server.jsx",
	externals: [
		/\.json$/,
		nodeExternals()
	],
	output: {
		path: "./dist",
		filename: "server.js",
		libraryTarget: "commonjs"
	},
	node: {
		__dirname: true
	}
})
