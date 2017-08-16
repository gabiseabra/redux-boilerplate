import React from "react"
import PropTypes from "prop-types"
import Spinner from "./Spinner"
import Error from "../Error"

const Loader = ({ loading, error, onRetry, children }) => {
	let content = children
	if(loading) content = <Spinner />
	else if(error) content = <Error error={error} onRetry={onRetry} />
	return <div>{content}</div>
}

Loader.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.instanceOf(Error),
	onRetry: PropTypes.func,
	children: PropTypes.node.isRequired
}

export default Loader
