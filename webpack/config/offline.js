import url from "url"

const PUBLIC_PATH = process.env.PUBLIC_PATH || "/"

export default externals => ({
	safeToUseOptionalCaches: true,
	caches: {
		main: [
			"main.*",
			"common.*",
			url.resolve(PUBLIC_PATH, "index.html"),
			...externals
		],
		additional: [
			":externals:"
		],
		optional: [
			":rest:"
		]
	},
	externals: [
		url.resolve(PUBLIC_PATH, "favicon.ico"),
		url.resolve(PUBLIC_PATH, "icon.png"),
		url.resolve(PUBLIC_PATH, "manifest.json"),
		url.resolve(PUBLIC_PATH, "index.html"),
		...externals
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
})
