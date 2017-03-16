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

	get entry() { return this.cache[ENTRY_SCRIPT] }

	get styles() { return Array.from(this.getFiles("css")) }

	get scripts() {
		const scripts = []
		// eslint-disable-next-line no-restricted-syntax
		for(const script of this.getFiles("js")) {
			if(script !== this.entry) {
				scripts.push(script)
			}
		}
		return scripts
	}
}
