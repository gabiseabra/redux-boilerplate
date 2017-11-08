import { apiClient } from "./context"

describe("ApiClient", () => {
	before(apiClient())

	describe("#feed()", () => {
		it("returns a list of posts", function () {
			return this.apiClient.feed().then((posts) => {
				posts.should.be.an("array")
			})
		})
	})

	describe("#post()", () => {
		it("returns a post by id", function () {
			return this.apiClient.post(1).then((post) => {
				post.id.should.equal(1)
				post.should.contain.keys("title", "body")
			})
		})
	})
})
