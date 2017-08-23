import path from "path"
import webpack from "webpack"
import merge from "webpack-merge"
import OfflinePlugin from "offline-plugin"
import FontelloPlugin from "fontello-webpack-plugin"
import ManifestPlugin from "webpack-manifest-plugin"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import config, { loaders, context } from "../config"
import offline from "../config/offline"
import vendorConfig from "./vendor.babel"
import manifest from "../../public/dist/manifest.json"

const entry = [
	"babel-polyfill",
	"./src/bundles/client"
]

if(process.argv.indexOf("--hot") !== -1) {
	entry.unshift(
		"react-hot-loader/patch",
		"webpack-hot-middleware/client?reload=true"
	)
}

const vendors = {
	json: Object.keys(vendorConfig.entry).map(module => `/dist/${module}.manifest.json`),
	js: Object.keys(vendorConfig.entry).map(module => `/dist/${module}.dll.js`)
}

const offlineOptions = offline(vendors)

export default merge.smart(config, {
	entry,
	target: "web",
	output: {
		path: path.join(context, "public/dist"),
		publicPath: "/dist/"
	},
	module: {
		rules: loaders({
			styles: {
				extract: ExtractTextPlugin,
				fallback: "style-loader"
			}
		})
	},
	plugins: [
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
		new ExtractTextPlugin({
			filename: "[name].css",
			disable: process.env.NODE_ENV === "development"
		}),
		new BundleAnalyzerPlugin({
			openAnalyzer: false,
			generateStatsFile: process.env.STATS === "true",
			analyzerMode: process.env.ANALYZER || "disabled",
			analyzerHost: process.env.HOST,
			analyzerPort: process.env.ANALYZER_PORT
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
