/**
 * Vendor bundle configuration file
 */
import path from "path"
import webpack from "webpack"

export default {
	target: "web",
	entry: {
		react: [
			"react",
			"react-dom",
			"react-helmet",
			"react-router"
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
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: false
		})
	]
}
