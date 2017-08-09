/**
 * Base Webpack configuration file
 */
import path from "path"
import webpack from "webpack"
import merge from "webpack-merge"
import loaders from "./loaders"
import envConfig from "./env"

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
