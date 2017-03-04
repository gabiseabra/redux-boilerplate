import React, { PropTypes } from "react"
import serialize from "serialize-javascript"
import ReactDOM from "react-dom/server"
import Helmet from "react-helmet"

const Html = ({ data, profile, store, children }) => {
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
				<link rel="stylesheet" href="/dist/app.css" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
				<script id="data" type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
				<script id="profile" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }} />
				<script type="text/javascript" src="/dist/manifest.js" />
			</head>
			<body>
				<div id="app" dangerouslySetInnerHTML={{ __html: content }} />
				<script type="text/javascript" src="/dist/vendor.js" />
				{store &&
				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `window.__state=${serialize(store.getState())}`
					}} />}
				<script type="text/javascript" src="/dist/app.js" />
			</body>
		</html>
	)
}

Html.propTypes = {
	store: PropTypes.object,
	data: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	children: PropTypes.node
}

export default Html

export const render = (data, profile, store, component) => {
	const html = ReactDOM.renderToStaticMarkup(
		<Html data={data} profile={profile} store={store}>{component}</Html>
	);
	return `<!doctype html>\n${html}`;
}
