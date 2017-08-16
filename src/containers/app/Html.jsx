import React from "react"
import PropTypes from "prop-types"
import serialize from "serialize-javascript"
import ReactDOM from "react-dom/server"
import Helmet from "react-helmet"

const Html = ({ apiUrl, store, data, manifest, children }) => {
	const content = children ? ReactDOM.renderToString(children) : ""
	const head = Helmet.rewind()
	const html = head.htmlAttributes.toComponent()
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
				<link rel="manifest" href="/manifest.json" />
				{manifest.styles.map(src => <link key={src} rel="stylesheet" href={src} data-hot />)}
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
				<meta name="api" content={apiUrl} />
				<script id="data" type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
				{manifest.scripts.map(src => <script key={src} src={src} />)}
			</head>
			<body>
				<div id="app" dangerouslySetInnerHTML={{ __html: content }} />
				{store &&
				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `window.__state=${serialize(store.getState())}`
					}} />}
				<script src={manifest.entry} defer />
			</body>
		</html>
	)
}

Html.propTypes = {
	apiUrl: PropTypes.string.isRequired,
	store: PropTypes.object,
	data: PropTypes.object.isRequired,
	manifest: PropTypes.object.isRequired,
	children: PropTypes.node
}

Html.defaultTypes = {
	data: {}
}

export default Html

export const renderWith = (data, manifest, apiUrl) => (component, store) => {
	const html = ReactDOM.renderToStaticMarkup(
		<Html
			data={data}
			manifest={manifest}
			apiUrl={apiUrl}
			store={store}>
			{component}
		</Html>
	)
	return `<!doctype html>\n${html}`
}
