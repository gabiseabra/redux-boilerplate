import React from "react"
import Helmet from "react-helmet"
import { Page } from "../../components/views"

export default function Hello() {
	return (
		<Page>
			<Helmet title="Hello" />
			<Page.Title>Hello</Page.Title>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur
				commodo libero. Aliquam eu dignissim ligula, quis lacinia lorem. <a href="/">In ultricies
				eros</a> et accumsan convallis. Vestibulum ante ipsum primis in faucibus orci luctus
				et ultrices posuere cubilia Curae; Nulla efficitur lectus ac urna porttitor
				condimentum. <b>Nunc elit mi</b>, dignissim et dui sit amet, eleifend dictum risus. In
				facilisis auctor eget non libero. Fusce felis turpis, tempus sed elit quis,
				mattis tempus dolor. Sed venenatis maximus diam, et dictum elit efficitur et.
			</p>
			<section>
				<h1>Hello</h1>
				<h2>Hello</h2>
				<h3>Hello</h3>
				<h4>Hello</h4>
				<h5>Hello</h5>
				<h6>Hello</h6>
				<p>Hello World</p>
			</section>
			<blockquote>
				Sed eget orci eu orci consequat dignissim. Aliquam nec scelerisque tortor, et
				fermentum nunc. Integer gravida id turpis sit amet auctor. Nam eget felis
				tincidunt, pulvinar mauris et, finibus erat. Nam dapibus felis quis pretium
				efficitur. Cras laoreet efficitur ullamcorper. Vivamus id venenatis ipsum.
				Phasellus ut eros id tellus congue ornare. Maecenas mattis vestibulum tellus.
				Donec neque erat, tempor eu augue nec, mattis congue elit. Etiam hendrerit metus
				purus, id mattis tortor malesuada sit amet. Sed sit amet mi metus. Quisque quis
				euismod nunc.
			</blockquote>
		</Page>
	)
}
