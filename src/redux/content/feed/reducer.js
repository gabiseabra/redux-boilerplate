import {
	REQUEST,
	SUCCESS,
	FAILURE
} from "./actions"

const initialState = {
	loading: undefined,
	posts: [],
	err: undefined
}

export default function feed(state = initialState, action) {
	switch(action.type) {
		case REQUEST:
			return {
				loading: true,
				posts: [],
				err: undefined
			};
		case SUCCESS:
			return {
				loading: false,
				posts: action.data,
				err: undefined
			};
		case FAILURE:
			return {
				loading: false,
				posts: [],
				err: action.err
			};
		default: return state;
	}
}
