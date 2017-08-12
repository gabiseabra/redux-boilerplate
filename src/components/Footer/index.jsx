import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import styles from "./Footer.css"

export default class Footer extends PureComponent {
	static propTypes = {
		className: PropTypes.string
	}

	static contextTypes = {
		data: PropTypes.object.isRequired
	}

	renderNetworks() {
		const { data } = this.context
		const networks = []
		Object.keys(data.social).forEach(key => {
			const { label, url, icon } = data.social[key]
			networks.push(
				<a
					target="_blank"
					rel="noreferrer noopener"
					key={key}
					href={url}
					title={label}>
					<span className={`icon-${icon}`} />
				</a>
			)
		})
		return networks
	}

	render() {
		const { className } = this.props
		const { data } = this.context
		return (
			<footer className={classnames(styles.Footer, className)}>
				<div className={classnames(styles.container, styles.copyright)}>
					{data.copy && <div>&copy; 2017 - {data.copy}</div>}
					<div className={styles.social}>
						{this.renderNetworks()}
						{data.email &&
						<a href={`mailto:${data.email}`} title="Email">
							<span className="icon-email" />
						</a>}
					</div>
				</div>
			</footer>
		)
	}
}
