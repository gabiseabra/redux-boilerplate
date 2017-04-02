import webpack from "webpack"

export const CSS_MODULE_NAME = "[hash:base64:5]"

export default {
	plugins: [
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: false
		})
	]
}
