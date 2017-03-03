export const LOAD = "content/posts/LOAD"
export const REQUEST = "content/posts/REQUEST"
export const SUCCESS = "content/posts/SUCCESS"
export const FAILURE = "content/posts/FAILURE"

export const load = () => ({ type: LOAD })
export const request = name => ({ type: REQUEST, name })
export const success = (data, name) => ({ type: SUCCESS, name, data })
export const fail = (err, name) => ({ type: FAILURE, name, err })

export default function posts(state = {}, action) {
	switch(action.type) {
		// @todo
		default: return state;
	}
}
