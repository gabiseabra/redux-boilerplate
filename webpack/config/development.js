import webpack from "webpack"

export const CSS_MODULE_NAME = "[name]_[local]--[hash:base64:5]"

export default {
	devtool: "inline-source-map",
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.EnvironmentPlugin({
			NODE_ENV: "production"
		})
	]
}
