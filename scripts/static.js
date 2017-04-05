import config from "../config/app.json"
import profile from "../config/data.json"
import manifestJson from "../public/dist/manifest.json"
import { render } from "../src/app/Html"
import Manifest from "../src/lib/Manifest"

const out = render(
	config.app,
	profile,
	new Manifest(manifestJson)
)

process.stdout.write(out)
