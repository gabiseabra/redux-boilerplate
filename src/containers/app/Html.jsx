import React from "react"
import PropTypes from "prop-types"
import serialize from "serialize-javascript"
import ReactDOM from "react-dom/server"
import Helmet from "react-helmet"

const stateInjector = state => `window.__state=${serialize(state)}`

const Html = ({ store, data, manifest, children }) => {
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
				<meta name="viewport" content="width=device-width, user-scalable=no" />
				<script id="data" type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
				{manifest.scripts.map(src => <script key={src} src={src} />)}
			</head>
			<body>
				<div
					id="app"
					data-ssr={Boolean(content)}
					dangerouslySetInnerHTML={{ __html: content }} />
				{store &&
				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{ __html: stateInjector(store.getState()) }} />}
				<script src={manifest.entry} defer />
			</body>
		</html>
	)
}

Html.propTypes = {
	store: PropTypes.object,
	data: PropTypes.object.isRequired,
	manifest: PropTypes.object.isRequired,
	children: PropTypes.node
}

Html.defaultProps = {
	data: {}
}

export default Html

export const renderWith = props => (component, store) => {
	const html = ReactDOM.renderToStaticMarkup(
		<Html {...props} store={store}>{component}</Html>
	)
	return `<!doctype html>\n${html}`
}
