import http from "http"
import Express from "express"
import compression from "compression"
import config from "../config/app.json"
import { content } from "./modules"

const host = config.apiHost || "localhost"

const port = config.apiPort || 3002

const app = new Express()

const server = http.Server(app)

app.use(compression())

app.use("/content", content)

server.listen(port, err => {
	if(err) {
		console.error(err);
	}
	console.info("==> 💻 API server running @ http://%s:%s", host, port)
})
