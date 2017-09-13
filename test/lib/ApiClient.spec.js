/* eslint-env mocha */
import ApiClient from "../../src/lib/ApiClient"

describe("ApiClient", () => {
	const client = new ApiClient()

	describe("#feed()", () => {
		it("returns a list of posts", () => (
			client.feed().then((posts) => {
				posts.should.be.an("array")
			})
		))
	})

	describe("#post()", () => {
		it("returns a post by id", () => (
			client.post(1).then((post) => {
				post.id.should.equal(1)
				post.should.contain.keys("title", "body")
			})
		))
	})
})
