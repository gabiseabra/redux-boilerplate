import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import styles from "./Footer.css"

export default class Footer extends PureComponent {
	static propTypes = {
		className: PropTypes.string,
		appData: PropTypes.object.isRequired
	}

	renderNetworks() {
		const { appData } = this.props
		const networks = []
		Object.keys(appData.social).forEach((key) => {
			const { label, url, icon } = appData.social[key]
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
		const { appData, className } = this.props
		return (
			<footer className={classnames(styles.Footer, className)}>
				<div className={classnames(styles.container, styles.copyright)}>
					{appData.copy && <div>&copy; 2017 - {appData.copy}</div>}
					<div className={styles.social}>
						{this.renderNetworks()}
						{appData.email &&
						<a href={`mailto:${appData.email}`} title="Email">
							<span className="icon-email" />
						</a>}
					</div>
				</div>
			</footer>
		)
	}
}
