/**
 * Client bundle configuration file
 */
import path from "path"
import webpack from "webpack"
import merge from "webpack-merge"
import OfflinePlugin from "offline-plugin"
import FontelloPlugin from "fontello-webpack-plugin"
import ManifestPlugin from "webpack-manifest-plugin"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import config, { loaders } from "../config"
import vendorConfig from "./vendor.babel"
import manifest from "../../public/dist/manifest.json"

const vendors = {
	json: Object.keys(vendorConfig.entry).map(module => `/dist/${module}.manifest.json`),
	js: Object.keys(vendorConfig.entry).map(module => `/dist/${module}.dll.js`)
}

const offlineOptions = {
	safeToUseOptionalCaches: true,
	caches: {
		main: [
			"main.*",
			"common.js",
			"/index.html",
			...vendors.js
		],
		additional: [
			":externals:"
		],
		optional: [
			":rest:"
		]
	},
	externals: [
		"/favicon.ico",
		"/icon.png",
		"/manifest.json",
		"/index.html",
		...vendors.js
	],
	cacheMaps: [ {
		map: /.*/,
		to: "/",
		requestTypes: [ "navigate" ]
	} ],
	ServiceWorker: {
		output: "../sw.js"
	},
	AppCache: {
		directory: "../appcache/",
		FALLBACK: {
			"/": "/"
		}
	}
}

const extract = new ExtractTextPlugin({
	filename: "[name].css",
	disable: process.env.NODE_ENV === "development"
})

export default merge.smart(config, {
	target: "web",
	entry: [
		"babel-polyfill",
		"./src/client.jsx"
	],
	output: {
		path: path.join(__dirname, "../../public/dist"),
		publicPath: "/dist/"
	},
	module: {
		rules: loaders({
			styles: {
				extract,
				fallback: "style-loader"
			}
		})
	},
	plugins: [
		extract,
		new webpack.optimize.CommonsChunkPlugin("common"),
		new OfflinePlugin(offlineOptions),
		new ManifestPlugin({
			fileName: "manifest.json",
			publicPath: "/dist/",
			cache: manifest
		}),
		new FontelloPlugin({
			config: require("../../src/css/fontello.json")
		}),
		...(vendors.json.map(fileName => (
			new webpack.DllReferencePlugin({
				// eslint-disable-next-line import/no-dynamic-require
				manifest: require(`../../public/${fileName}`)
			})
		)))
	]
})

export { manifest }
