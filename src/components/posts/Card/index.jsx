import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Card = ({ post }) => (
	<section>
		<Link to={`/posts/${post.id}`}>
			<h3>{post.title}</h3>
		</Link>
	</section>
)


Card.propTypes = {
	post: PropTypes.object
}

export default Card
