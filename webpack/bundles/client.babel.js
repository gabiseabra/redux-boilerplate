import webpack from "webpack"
import merge from "webpack-merge"
import OfflinePlugin from "offline-plugin"
import FontelloPlugin from "fontello-webpack-plugin"
import ManifestPlugin from "webpack-manifest-plugin"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import config, { loaders } from "../config"
import offline from "../config/offline"
import * as vendor from "./vendor.babel"
import manifest from "../../public/dist/manifest.json"

const plugins = vendor.references()
const common = []

if(process.argv.indexOf("--hot") !== -1) {
	common.unshift(
		"react-hot-loader/patch",
		"webpack-hot-middleware/client?reload=true"
	)
}

if(process.env.OFFLINE === "true" && process.env.NODE_ENV === "production") {
	const offlineOptions = offline(vendor.scripts)
	plugins.unshift(new OfflinePlugin(offlineOptions))
}

export default merge.smart(config, {
	entry: {
		common: [
			"babel-polyfill",
			"./styles/app.css",
			...common
		],
		main: "./src/bundles/client"
	},
	target: "web",
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
		new ManifestPlugin({
			fileName: "manifest.json",
			publicPath: config.output.publicPath,
			cache: manifest
		}),
		new FontelloPlugin({
			config: require("../../styles/fontello.json")
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
		...plugins
	]
})

export { manifest }
