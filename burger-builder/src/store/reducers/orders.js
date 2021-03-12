import * as types from '../actions/types'

const initState = {
	orders: [],
	loading: false,
	purchased: false
}

const purchaseInit = state => ({
	...state,
	purchased: false
})

const purchaseStart = state => ({
	...state,
	loading: true
})

const purchaseSuccess = (state, action) => {
	const newOrder = {
		...action.orderData,
		id: action.orderID
	}
	return {
		...state,
		loading: false,
		orders: state.orders.concat(newOrder),
		purchased: true
	}
}

const purchaseFail = state => ({
	...state,
	loading: false
})

const fetchOrdersStart = state => ({
	...state,
	loading: true
})

const fetchOrdersSuccess = (state, action) => ({
	...state,
	orders: action.orders,
	loading: false
})

const fetchOrdersFail = state => ({
	...state,
	loading: false
})

const reducer = (state = initState, action) => {
	switch (action.type) {
		case types.PURCHASE_INIT: return purchaseInit(state);
		case types.PURCHASE_START: return purchaseStart(state)
		case types.PURCHASE_SUCCESS: return purchaseSuccess(state, action)
		case types.PURCHASE_FAIL: return purchaseFail(state)
		case types.FETCH_ORDERS_START: return fetchOrdersStart(state)
		case types.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
		case types.FETCH_ORDERS_FAIL: return fetchOrdersFail(state)
		default: return state
	}
}

export default reducer