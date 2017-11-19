import url from "url"
import path from "path"
import webpack from "webpack"
import ManifestPlugin from "webpack-manifest-plugin"
import config from "../config"

const vendorConfig = {
	target: "web",
	entry: {
		vendor: [
			"classnames",
			"history"
		],
		react: [
			"react",
			"react-dom",
			"react-helmet",
			"react-router-dom"
		]
	},
	output: {
		...config.output,
		filename: "[name].dll.js",
		library: "[name]_dll"
	},
	plugins: [
		new webpack.EnvironmentPlugin([ "NODE_ENV" ]),
		new webpack.optimize.UglifyJsPlugin({
			minimize: (process.env.NODE_ENV === "production"),
			sourceMap: false
		}),
		new webpack.DllPlugin({
			path: path.join(__dirname, "../../public/dist/[name].manifest.json"),
			name: "[name]_dll"
		}),
		new ManifestPlugin({
			fileName: "manifest.json",
			publicPath: config.output.publicPath
		})
	]
}

export default vendorConfig

export function entryPath(entry) {
	return url.resolve(vendorConfig.output.publicPath, `${entry}.dll.js`)
}

export function manifest(entry) {
	return require(`../../public/dist/${entry}.manifest.json`) // eslint-disable-line
}

export const references = () => Object.keys(vendorConfig.entry).map(entry => (
	new webpack.DllReferencePlugin({
		manifest: manifest(entry)
	})
))

export const scripts = Object.keys(vendorConfig.entry).map(entry => entryPath(entry))
