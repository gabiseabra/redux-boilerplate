/* eslint-env mocha */
import React from "react"
import PropTypes from "prop-types"
import { mount } from "enzyme"
import Provider, { withAppData } from "./Provider"

const data = {
	foo: "foo",
	bar: "bar"
}

describe("<Provider />", () => {
	it("provides app data to children", () => {
		const Child = ({ appData }) => (<div>{appData.foo}</div>)
		Child.propTypes = { appData: PropTypes.object.isRequired }
		const ChildHOC = withAppData(Child)
		const wrapper = mount(
			<Provider data={data}>
				<ChildHOC />
			</Provider>
		)
		wrapper.find(Child).prop("appData").should.equal(data)
	})
})
