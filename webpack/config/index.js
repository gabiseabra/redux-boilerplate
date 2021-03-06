/**
 * Base Webpack configuration file
 */
import url from "url"
import path from "path"
import webpack from "webpack"
import merge from "webpack-merge"
import loadersFn from "./loaders"
import envConfig from "./env"

export const context = path.resolve(__dirname, "..", "..")

export const publicPath = url.resolve(process.env.PUBLIC_PATH || "/", "dist/")

const plugins = [
	new webpack.EnvironmentPlugin({
		NODE_ENV: "",
		PUBLIC_PATH: "/",
		OFFLINE: "false",
		SSR: "false"
	})
]

if(process.argv.indexOf("--hot") !== -1) {
	process.env.OFFLINE = "false"
	plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)
}

export default merge.smart({
	context,
	output: {
		publicPath,
		path: path.join(context, "public/dist"),
		filename: "[name].js"
	},
	resolve: {
		extensions: [ ".json", ".js", ".jsx" ]
	},
	plugins
}, envConfig)

export const loaders = loadersFn.bind(undefined, context)
