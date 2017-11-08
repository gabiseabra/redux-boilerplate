import React from "react"
import PropTypes from "prop-types"
import { Loader } from "../../shared"

const Page = ({ loading, error, children }) => (
	<main>
		<Loader loading={loading} error={error}>
			{children}
		</Loader>
	</main>
)

Page.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.instanceOf(Error),
	children: PropTypes.node
}

Page.defaultProps = {
	loading: false
}

Page.Title = ({ children }) => (<h1>{children}</h1>)

Page.Title.propTypes = {
	children: PropTypes.node
}

export default Page
