const defaults = {
	css: {
		modules: true,
		importLoaders: 1,
		localIdentName: "[hash:base64:5]"
	}
}

if(process.env.NODE_ENV === "development") {
	defaults.css.localIdentName = "[name]_[local]--[hash:base64:5]"
}

export default function build(opts) {
	const {
		extract,
		fallback,
		...options
	} = Object.assign({}, opts, defaults)
	const loaders = [
		{
			test: /global\.css$/,
			use: "css-loader"
		},
		{
			test: /\.css$/,
			use: [
				{ loader: "css-loader", options: options.css },
				{ loader: "postcss-loader", options: options.postcss }
			]
		},
		{
			test: /\.scss$/,
			use: [
				{ loader: "css-loader", options: options.css },
				{ loader: "sass-loader", options: options.sass }
			]
		},
		{
			test: /\.less$/,
			use: [
				{ loader: "css-loader", options: options.css },
				{ loader: "less-loader", options: options.less }
			]
		}
	]
	if(extract) {
		return loaders.map(loader => ({
			...loader,
			use: extract.extract({
				use: loader.use,
				fallback
			})
		}))
	}
	return loaders
}
