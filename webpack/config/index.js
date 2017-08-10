/**
 * Base Webpack configuration file
 */
import path from "path"
import webpack from "webpack"
import merge from "webpack-merge"
import loadersFn from "./loaders"
import envConfig from "./env"

const context = path.resolve(__dirname, "..", "..")

const plugins = [
	new webpack.EnvironmentPlugin({
		NODE_ENV: "",
		OFFLINE: "false"
	})
]

if(process.argv.indexOf("--hot") !== -1) {
	plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({ HMR: true })
	)
}

export default merge.smart({
	context,
	output: {
		filename: "[name].js"
	},
	resolve: {
		extensions: [ ".js", ".jsx" ]
	},
	plugins
}, envConfig)

export const loaders = loadersFn.bind(undefined, context)
