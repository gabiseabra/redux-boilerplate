import { apiClient } from "../lib/context"
import { store } from "./context"

describe("redux", () => {
	beforeEach(apiClient())
	beforeEach(store())

	require("./modules")
})
