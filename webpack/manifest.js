import fs from "fs"
import path from "path"

const fileName = path.join(__dirname, "../public/dist/manifest.json")

const manifest = {}

if(fs.existsSync(fileName)) {
	Object.assign(manifest, require(fileName))
}

export default manifest
