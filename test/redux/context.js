import createSaga from "../../src/redux/saga"
import createStore from "../../src/redux/store"
import { apiClient } from "../lib/context"

export function saga() {
	if(!this.apiClient) apiClient.call(this)
	this.saga = createSaga(this.apiClient)
}

export const store = state => function () {
	if(!this.saga) saga.call(this)
	this.store = createStore(state)
	this.store.select = (selector, props) => selector(this.store.getState(), props)
	this.store.start = () => { this.task = this.store.runSaga(this.saga) }
	this.store.done = async () => {
		await this.store.close()
		const promise = this.task.done
		this.store.start()
		return promise
	}
	this.store.run = (fun) => {
		if(!this.task) this.store.start()
		fun.call(this)
		return this.store.done()
	}
	this.store.start()
}
