import path from "path"

export default root => (context, request, callback) => {
	if(/^config\//.test(request)) {
		callback(null, path.resolve(root, request))
	} else if(request === "manifest.json") {
		callback(null, path.resolve(root, "public/dist/manifest.json"))
	} else {
		callback()
	}
}
