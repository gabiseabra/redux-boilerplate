/* eslint-env mocha */
import React from "react"
import PropTypes from "prop-types"
import { mount } from "enzyme"
import Provider, { withAppData } from "./Provider"
import createStore from "../../redux/store"

const store = createStore()

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
			<Provider data={data} store={store}>
				<ChildHOC />
			</Provider>
		)
		wrapper.find(Child).prop("appData").should.equal(data)
	})
})
