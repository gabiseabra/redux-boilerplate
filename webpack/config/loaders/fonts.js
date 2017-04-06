export default function build({ limit }) {
	return [
		{
			test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url-loader",
			options: {
				mimetype: "application/font-woff"
			}
		},
		{
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url-loader",
			options: {
				mimetype: "application/octet-stream",
				limit
			}
		},
		{
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url-loader",
			options: {
				mimetype: "image/svg+xml",
				limit
			}
		},
		{
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: "file-loader"
		}
	]
}
