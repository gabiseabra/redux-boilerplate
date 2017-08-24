/**
 * Base Webpack configuration file
 */
import path from "path"
import webpack from "webpack"
import merge from "webpack-merge"
import loadersFn from "./loaders"
import envConfig from "./env"

export const context = path.resolve(__dirname, "..", "..")

const plugins = [
	new webpack.EnvironmentPlugin({
		NODE_ENV: "",
		OFFLINE: "false",
		SSR: "false"
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
		extensions: [ ".json", ".js", ".jsx" ],
		alias: {
			"manifest.json$": path.join(context, "public/dist/manifest.json"),
			config: path.join(context, "config"),
			public: path.join(context, "public")
		}
	},
	plugins
}, envConfig)

export const loaders = loadersFn.bind(undefined, context)
