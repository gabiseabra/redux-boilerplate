/**
 * Client bundle configuration file
 */
import path from "path"
import webpack from "webpack"
import merge from "webpack-merge"
import OfflinePlugin from "offline-plugin"
import FontelloPlugin from "fontello-webpack-plugin"
import ManifestPlugin from "webpack-manifest-plugin"
import config from "../config"
import vendorConfig from "./vendor.babel"
import manifest from "../../public/dist/manifest.json"

const vendors = {
	json: Object.keys(vendorConfig.entry).map(module => `/dist/${module}.manifest.json`),
	js: Object.keys(vendorConfig.entry).map(module => `/dist/${module}.dll.js`),
}

export { manifest }

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
	plugins: [
		new ManifestPlugin({
			fileName: "manifest.json",
			publicPath: "/dist/",
			cache: manifest
		}),
		new FontelloPlugin({
			config: require("../../src/css/fontello.json")
		}),
		new webpack.optimize.CommonsChunkPlugin("common"),
		new OfflinePlugin({
			safeToUseOptionalCaches: true,
			caches: {
				main: [
					"main.js",
					"main.css",
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
				"/manifest.json"
			],
			cacheMaps: [
				{
					map: /.*/,
					to: "/",
					requestTypes: [ "navigate" ]
				}
			],
			ServiceWorker: {
				output: "../sw.js"
			},
			AppCache: {
				directory: "../appcache/",
				FALLBACK: { "/": "/" }
			}
		}),
		...(vendors.json.map(fileName => (
			new webpack.DllReferencePlugin({
				// eslint-disable-next-line import/no-dynamic-require
				manifest: require(`../../public/${fileName}`)
			})
		)))
	]
})
