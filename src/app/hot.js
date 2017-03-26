export default function sync(reporter, timeout = 2000) {
	const next = reporter.success
	// eslint-disable-next-line no-param-reassign
	reporter.success = function () {
		document.querySelectorAll("link[href][rel=stylesheet]").forEach((link) => {
			if("hot" in link.dataset) {
				const href = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
				const newLink = link.cloneNode()
				newLink.href = href
				link.parentNode.appendChild(newLink)
				setTimeout(() => {
					if(link.parentNode) {
						link.parentNode.removeChild(link)
					}
				}, timeout)
			}
		})
		next()
	}
}
