import Manifest from "../../src/lib/Manifest"

const manifest = new Manifest({
	"main.js": "main.js",
	"foo.js": "foo.js",
	"bar.js": "bar.js",
	"foo.css": "foo.css"
})

describe("Manifest", () => {
	describe("#entry", () => {
		it("returns the main script", () => {
			manifest.entry.should.equal("main.js")
		})
	})

	describe("#scripts", () => {
		it("returns an array of js files", () => {
			manifest.scripts.should.contain.members([ "foo.js", "bar.js" ])
		})

		it("excludes entry script ", () => {
			manifest.scripts.should.not.contain("main.js")
		})
	})

	describe("#styles", () => {
		it("returns an array of css files", () => {
			manifest.styles.should.contain.members([ "foo.css" ])
		})
	})
})
