import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Page from "../Page"

const NotFound = ({ message }) => (
	<Page>
		<Helmet title={message} />
		<Page.Title>404</Page.Title>
		<p>The page you have requested does not exist.</p>
	</Page>
)

NotFound.propTypes = {
	message: PropTypes.string.isRequired
}

export default NotFound
