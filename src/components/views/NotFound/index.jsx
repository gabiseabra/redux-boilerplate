import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

const NotFound = ({ message }) => (
	<section>
		<Helmet title={message} />
		<h1>404</h1>
		<p>The page you have requested does not exist.</p>
	</section>
)

NotFound.propTypes = {
	message: PropTypes.string.isRequired
}

export default NotFound
