/**
 * Base Webpack configuration file
 */
import path from "path"
import webpack from "webpack"
import merge from "webpack-merge"
import loaders from "./loaders"

require("dotenv").load()

const plugins = [
	new webpack.EnvironmentPlugin([
		"NODE_ENV",
		"HMR"
	])
]

let envConfig = {}

try {
	if(process.env.NODE_ENV) {
		// eslint-disable-next-line
		envConfig = require(`./${process.env.NODE_ENV}`).default
	}
} catch(e) { /* No environment config */ }

if(process.env.HMR) {
	plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)
}

export default merge.smart({
	context: path.resolve(__dirname, "..", ".."),
	output: {
		filename: "[name].js"
	},
	resolve: {
		extensions: [ ".js", ".jsx" ]
	},
	plugins
}, envConfig)

export { loaders }
