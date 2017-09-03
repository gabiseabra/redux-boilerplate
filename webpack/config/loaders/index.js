import fonts from "./fonts"
import images from "./images"
import styles from "./styles"
import scripts from "./scripts"

const modules = { fonts, images, styles, scripts }

export { fonts, images, styles, scripts }

export default function build(context, options = {}) {
	const loaders = []
	Object.keys(modules).forEach((name) => {
		if(options[name] === false) {
			return
		}
		const buildModule = modules[name]
		loaders.push(...buildModule(options[name] || {}, context))
	})
	return loaders
}
