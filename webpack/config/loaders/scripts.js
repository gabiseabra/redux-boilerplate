import path from "path"

export default function build() {
	return [
		{
			test: /\.jsx?$/,
			include: [ path.resolve(__dirname, "..", "..", "..", "src") ],
			loader: "babel-loader"
		}
	]
}
