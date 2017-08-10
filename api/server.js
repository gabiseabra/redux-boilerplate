import jsonServer from "json-server"
import config from "../config/app.json"
import content from "./content"

const host = config.api.host || "localhost"

const port = config.api.port || 3002

const server = jsonServer.create()

server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	next()
})

server.use(jsonServer.router(content))

server.listen(port, err => {
	if(err) {
		console.error(err)
	}
	console.info("==> 💻  API server running @ http://%s:%s", host, port)
})
