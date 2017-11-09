import * as actions from "../../../src/redux/modules/feed"
import { getFeedPosts } from "../../../src/redux/modules/feed/selectors"
import { getAllPosts } from "../../../src/redux/modules/posts/selectors"

describe(actions.LOAD, () => {
	beforeEach(async function () {
		await this.store.run(() => {
			this.store.dispatch(actions.load())
		})
	})

	it("loads feed data", function () {
		const feed = this.store.select(getFeedPosts)
		feed.should.not.be.empty
		feed.should.be.an("array").and.all.contain.keys("title", "body")
	})

	it("loads post data into posts reducer", function () {
		const posts = this.store.select(getAllPosts)
		posts.should.not.be.empty
		posts.should.be.an("object")
		Object.values(posts).should.all.contain.keys("title", "body")
	})
})

