const Reducers = {
	single: (actions) => function (state = {}, action) {
		switch(action.type) {
			case actions.REQUEST:
				return {
					...state,
					loading: true
				}
			case actions.SUCCESS:
				return {
					...state,
					loaded: true,
					loading: false,
					data: action.data
				}
			case actions.FAILURE:
				return {
					...state,
					loaded: false,
					loading: false,
					error: action.error
				}
			default: return state
		}
	},
	multi: (actions) => function (state = {}, action) {
		switch(action.type) {
			case actions.SUCCESS:
				return {
					...state,
					[action.name]: action.data
				}
			case actions.FAILURE:
				return {
					...state,
					[action.name]: { error: action.error }
				}
			default: return state
		}
	}
}

export default function create(entity, type) {
	const actions = {
		LOAD: `content/${entity}/LOAD`,
		REQUEST: `content/${entity}/REQUEST`,
		SUCCESS: `content/${entity}/SUCCESS`,
		FAILURE: `content/${entity}/FAILURE`
	}
	actions.load = (name) => ({ type: actions.LOAD, name });
	actions.request = (name) => ({ type: actions.REQUEST, name });
	actions.success = (data, name) => ({ type: actions.SUCCESS, data, name });
	actions.fail = (error, name) => ({ type: actions.FAILURE, error, name });
	actions.reducer = Reducers[type](actions)

	return actions
}
