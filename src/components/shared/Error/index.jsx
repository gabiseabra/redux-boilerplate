import React from "react"
import PropTypes from "prop-types"

const Error = ({ error, onRetry }) => (
	<div>
		<details>
			<summary>Failed to load content</summary>
			<p>{error.message}</p>
		</details>
		{onRetry &&
		<button onClick={onRetry} tabIndex="0">Retry</button>}
	</div>
)

Error.propTypes = {
	error: PropTypes.instanceOf(Error).isRequired,
	onRetry: PropTypes.func
}

export default Error
