import React from "react"
import PropTypes from "prop-types"

const Error = ({ error, errorMessage, retryMessage, onRetry }) => (
	<div>
		<details>
			<summary>{errorMessage}</summary>
			<p>{error.message}</p>
		</details>
		{onRetry &&
		<button onClick={onRetry} tabIndex="0">
			{retryMessage}
		</button>}
	</div>
)

Error.propTypes = {
	error: PropTypes.instanceOf(Error),
	onRetry: PropTypes.func,
	errorMessage: PropTypes.string.isRequired,
	retryMessage: PropTypes.string.isRequired
}

Error.defaultProps = {
	errorMessage: "Failed to load content",
	retryMessage: "Retry"
}

export default Error
