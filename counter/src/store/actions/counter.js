import * as types from './types'

export const increment = () => ({
	type: types.INCREMENT,
})

export const decrement = () => ({
	type: types.DECREMENT,
})

export const add = value => ({
	type: types.ADD,
	payload: value,
})

export const subtract = value => ({
	type: types.SUBTRACT,
	payload: value,
})
