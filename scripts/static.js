import data from "../config/app.json"
import manifestJson from "../public/dist/manifest.json"
import { renderWith } from "../src/containers/app"
import Manifest from "../src/lib/Manifest"

const out = renderWith({
	data,
	manifest: new Manifest(manifestJson)
})()

process.stdout.write(out)
