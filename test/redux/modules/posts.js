import * as actions from "../../../src/redux/modules/posts"
import { getPost } from "../../../src/redux/modules/posts/selectors"

describe(actions.LOAD, () => {
	beforeEach(async function () {
		await this.store.run(() => {
			this.store.dispatch(actions.load(4))
		})
	})

	it("loads one post", function () {
		const post = this.store.select(getPost, { id: 4 })
		post.should.not.be.empty
		post.should.be.an("object").and.contain.keys("title", "body")
	})
})

