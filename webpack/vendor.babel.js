/**
 * Vendor bundle configuration file
 */
import path from "path"
import webpack from "webpack"
import ManifestPlugin from "webpack-manifest-plugin"

export default {
	target: "web",
	entry: {
		axios: [ "axios" ],
		react: [
			"react",
			"react-dom",
			"react-helmet",
			"react-redux",
			"react-router",
			"redux",
			"redux-saga"
		]
	},
	output: {
		path: path.join(__dirname, "../public/dist"),
		filename: "[name].dll.js",
		library: "[name]_dll"
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, "../public/dist/[name].manifest.json"),
			name: "[name]_dll"
		}),
		new ManifestPlugin({
			fileName: "manifest.dll.json",
			publicPath: "dist/"
		}),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: false
		})
	]
}
