const ENTRY_SCRIPT = "main.js"

export default class Manifest {
	files = {}

	constructor(...files) {
		if(files.length) {
			this.files = Object.assign(...files)
		}
		this.entry = this.files[ENTRY_SCRIPT]
		delete this.files[ENTRY_SCRIPT]
	}

	* getFiles(ext) {
		const regExp = ext instanceof RegExp ? ext : new RegExp(`.${ext}`)
		// eslint-disable-next-line no-restricted-syntax
		for(const fileName in this.files) {
			if(regExp.test(fileName)) {
				yield this.files[fileName]
			}
		}
	}

	get scripts() { return Array.from(this.getFiles("js")) }

	get styles() { return Array.from(this.getFiles("css")) }
}
