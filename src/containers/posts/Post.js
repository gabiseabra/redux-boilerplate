import { connect } from "react-redux"
import { Post } from "../../components/posts"
import { getPost } from "../../redux/modules/posts/selectors"

const props = (...args) => ({
	post: getPost(...args)
})

export default connect(props)(Post)
