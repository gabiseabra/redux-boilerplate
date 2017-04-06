export default function build(options) {
	return [
		{
			test: /\.(jpe?g|png|gifv?)?$/,
			loader: "url-loader",
			options
		}
	]
}
