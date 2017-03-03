import path from "path"
import fs from "fs"
import Express from "express"

const router = Express.Router()

const directory = path.join(__dirname, "../../content")

const sortArticles = (a, b) => (new Date(a.date) - new Date(b.date))

router.get("/:name?", (req, res, next) => {
	const file = (req.params.name ? path.join(directory, req.params.name) : directory);
	if(fs.existsSync(file)) {
		const lastModified = fs.statSync(file).mtime;
		let ifModifiedSince = res.get("If-Modified-Since");
		if(ifModifiedSince) {
			try {
				ifModifiedSince = new Date(ifModifiedSince);
			} catch(e) {
				ifModifiedSince = undefined;
			}
		}
		res.setHeader("Cache-Control", "public, max-age=31536000");
		res.setHeader("Last-Modified", lastModified);
		if(!lastModified || !ifModifiedSince || (lastModified > ifModifiedSince)) {
			next();
		} else {
			res.status(304);
		}
	} else {
		res.status(404).json(undefined);
	}
})

router.get("/", (req, res) => {
	const files = fs.readdirSync(directory);
	const articles = [];
	for(let i = 0; i < files.length; ++i) {
		const name = files[i];
		const json = path.join(directory, name, "index.json");
		if(fs.existsSync(json)) {
			try {
				const data = JSON.parse(fs.readFileSync(json));
				data.name = name;
				articles.push(data);
			} catch(e) {
				console.error(e);
			}
		}
	}
	articles.sort(sortArticles);
	res.json(articles);
})

router.get("/:name", (req, res) => {
	const files = {
		data: path.join(directory, req.params.name, "index.json"),
		content: path.join(directory, req.params.name, "index.html")
	}
	if(fs.existsSync(files.data)) {
		try {
			const data = JSON.parse(fs.readFileSync(files.data, "utf8"));
			if(fs.existsSync(files.content)) {
				data.content = fs.readFileSync(files.content, "utf8");
			}
			res.json(data);
		} catch(e) {
			console.error(e);
			res.status(500).json(undefined);
		}
	} else {
		res.status(404).json(undefined);
	}
})

export default router
