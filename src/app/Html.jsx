import React, { PropTypes } from "react"
import ReactDOM from "react-dom/server"
import Helmet from "react-helmet"

const Html = ({ data, profile, children }) => {
	const content = children ? ReactDOM.renderToString(children) : "";
	const head = Helmet.rewind();
	const html = head.htmlAttributes.toComponent();
	return (
		<html lang="en" {...html}>
			<head>
				<meta charSet="utf8" />
				{head.base.toComponent()}
				{head.title.toComponent()}
				{head.meta.toComponent()}
				{head.link.toComponent()}
				{head.script.toComponent()}
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
				<script id="app" type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
				<script id="data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }} />
			</head>
			<body>
				<div id="app" dangerouslySetInnerHTML={{ __html: content }} />
			</body>
		</html>
	)
}

Html.propTypes = {
	data: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	children: PropTypes.node
}

export default Html
