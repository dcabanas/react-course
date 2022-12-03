const redux = require('redux')
const createStore = redux.createStore

//INITIAL STATE
const initState = {
	counter: 0,
}

//REDUCER
const rootReducer = (state = initState, action) => {
	if (action.type === 'INC_COUNTER') {
		state = {
			...state,
			counter: state.counter + 1,
		}
	} else if (action.type === 'ADD_COUNTER') {
		state = {
			...state,
			counter: state.counter + action.value,
		}
	}
	return state
}

//STORE
const store = createStore(rootReducer)

//SUBSCRIPTION
store.subscribe(() => {
})

//DISPATCHING ACTION
store.dispatch({type: 'INC_COUNTER'})
store.dispatch({type: 'ADD_COUNTER', value: 10})
