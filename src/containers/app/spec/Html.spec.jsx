/* eslint-env mocha */
import React from "react"
import { shallow } from "enzyme"
import Html from "../Html"

const manifest = {
	entry: "main.js",
	styles: [ "style.css" ],
	scripts: [ "script.js" ]
}

describe.only("<Html />", () => {
	it("renders assets from manifest.json", () => {
		const wrapper = shallow(<Html manifest={manifest} />)
		wrapper.find("script[src='main.js']").should.be.present()
		wrapper.find("script[src='script.js']").should.be.present()
		wrapper.find("link[href='style.css']").should.be.present()
	})

	it("renders app data json", () => {
		const data = {
			foo: "foo",
			bar: "bar"
		}
		const wrapper = shallow(<Html manifest={manifest} data={data} />)
		JSON.parse(wrapper.find("#data").render().html()).should.contain(data)
	})
})
