const defaults = {
	"@type": "Thing"
}

function normalize(data) {
	const info = Object.assign({}, data, defaults)
	if(typeof info.sameAs === "string") {
		info.sameAs = [ info.sameAs ]
	}
	return info
}

export default class Profile {
	constructor(data) {
		this.info = normalize(data)
	}

	social(domain) {
		const { sameAs } = this.info
		if(sameAs) {
			const regExp = new RegExp(`^https?:\\/\\/([^\\.]+\\.)*${domain.replace(/[^\w\s]/g, "\\$&")}`)
			for(let i = 0; i < sameAs.length; ++i) {
				const url = sameAs[i]
				if(url.match(regExp)) {
					return url
				}
			}
		}
	}
}
