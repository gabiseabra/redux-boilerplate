export default vendors => ({
	safeToUseOptionalCaches: true,
	caches: {
		main: [
			"main.*",
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
		"/manifest.json",
		"/index.html",
		...vendors.js
	],
	cacheMaps: [ {
		map: /.*/,
		to: "/",
		requestTypes: [ "navigate" ]
	} ],
	ServiceWorker: (process.env.OFFLINE === "true" ? { output: "../sw.js" } : false),
	AppCache: {
		directory: "../appcache/",
		FALLBACK: {
			"/": "/"
		}
	}
})
