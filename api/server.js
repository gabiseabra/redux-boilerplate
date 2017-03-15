import jsonServer from "json-server"
import config from "../config/app.json"
import content from "./content"

const host = config.apiHost || "localhost"

const port = config.apiPort || 3002

const server = jsonServer.create()

server.use(jsonServer.router(content))

server.listen(port, err => {
	if(err) {
		console.error(err);
	}
	console.info("==> 💻 API server running @ http://%s:%s", host, port)
})
