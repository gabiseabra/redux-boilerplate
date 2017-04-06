const ENTRY_SCRIPT = "main.js"

export default class Manifest {
	constructor(cache = {}) {
		this.cache = cache
	}

	* getFiles(ext) {
		const regExp = ext instanceof RegExp ? ext : new RegExp(`.${ext}`)
		// eslint-disable-next-line no-restricted-syntax
		for(const fileName in this.cache) {
			if(regExp.test(fileName)) {
				yield this.cache[fileName]
			}
		}
	}

	filter(ext, options) {
		if(options && options.exclude) {
			const entries = []
			// eslint-disable-next-line no-restricted-syntax
			for(const entry of this.getFiles(ext)) {
				if(entry !== options.exclude) {
					entries.push(entry)
				}
			}
			return entries
		}
		return Array.from(this.getFiles(ext))
	}

	get entry() { return this.cache[ENTRY_SCRIPT] }

	get styles() {
		let exclude
		// FIXME:
		// ExtractTextPlugin adds main.css to the manifest when it's disabled.
		// This is the case in development, so it needs to be excluded to
		// avoid an invalid <link/> in the Html component.
		if(process.env.NODE_ENV === "development") {
			exclude = "main.css"
		}
		return this.filter("css", { exclude })
	}

	get scripts() { return this.filter("js", { exclude: this.entry }) }
}
