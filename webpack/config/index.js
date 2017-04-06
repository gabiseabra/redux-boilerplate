/**
 * Base Webpack configuration file
 */
import path from "path"
import webpack from "webpack"
import merge from "webpack-merge"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import loaders from "./loaders"

let envConfig = {}

try {
	if(process.env.NODE_ENV) {
		// eslint-disable-next-line
		envConfig = require(`./${process.env.NODE_ENV}`).default
	}
} catch(e) { /* No environment config */ }

export default merge.smart({
	context: path.resolve(__dirname, "..", ".."),
	output: {
		filename: "[name].js"
	},
	resolve: {
		extensions: [ ".js", ".jsx" ]
	},
	plugins: [
		new webpack.EnvironmentPlugin([
			"NODE_ENV",
			"HMR"
		])
	]
}, envConfig)

export { loaders }
