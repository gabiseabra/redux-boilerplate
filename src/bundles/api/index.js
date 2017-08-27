import jsonServer from "json-server"
import content from "./content"

const API_HOST = process.env.API_HOST || process.env.HOST || "localhost"
const API_PORT = process.env.API_PORT || 8080

const server = jsonServer.create()

server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	next()
})

server.use(jsonServer.router(content))

server.listen(API_PORT, (err) => {
	if(err) {
		console.error(err)
	}
	console.info("==> 💻  API server running @ http://%s:%s", API_HOST, API_PORT)
})
