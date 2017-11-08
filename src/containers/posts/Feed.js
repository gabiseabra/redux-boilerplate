import { connect } from "react-redux"
import { Feed } from "../../components/posts"
import { getFeedPosts } from "../../redux/modules/feed/selectors"

const props = state => ({
	posts: getFeedPosts(state, props)
})

export default connect(props)(Feed)
