module.exports = {
	plugins: {
		"postcss-partial-import": {
			prefix: "_",
			glob: true
		},
		"postcss-global-import": {},
		"postcss-import-url": {},
		"postcss-url": {},
		"postcss-cssnext": {}
	}
}
