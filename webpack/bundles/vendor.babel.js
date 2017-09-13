import url from "url"
import path from "path"
import webpack from "webpack"
import ManifestPlugin from "webpack-manifest-plugin"
import config from "../config"

const vendorConfig = {
	target: "web",
	entry: {
		vendor: [
			"isomorphic-fetch",
			"es6-error",
			"js-cookie",
			"classnames",
			"history"
		],
		react: [
			"react",
			"react-dom",
			"react-helmet",
			"react-redux",
			"react-router",
			"react-router-redux",
			"redux",
			"redux-saga",
			"redux-cookie"
		]
	},
	output: {
		...config.output,
		filename: "[name].dll.js",
		library: "[name]_dll"
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, "../../public/dist/[name].manifest.json"),
			name: "[name]_dll"
		}),
		new ManifestPlugin({
			fileName: "manifest.json",
			publicPath: config.output.publicPath
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: "production"
		}),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: false
		})
	]
}

export default vendorConfig

export function entryPath(entry) {
	return url.resolve(vendorConfig.output.publicPath, entry)
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
