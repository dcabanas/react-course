import * as types from '../actions/types'

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7,
}

const initState = {
   ingredients: null,
   totalPrice: 4,
   error: false,
   building: false,
}

const updtIg = (state, action, mode) => {
   const updatedIgs = { ...state.ingredients }
   if (mode === 'add') {
      updatedIgs[action.igName]++
   } else {
      updatedIgs[action.igName]--
   }
   let totalPrice = state.totalPrice
   if (mode === 'add') {
      totalPrice += INGREDIENT_PRICES[action.igName]
   } else {
      totalPrice -= INGREDIENT_PRICES[action.igName]
   }
   return {
      ...state,
      ingredients: updatedIgs,
      totalPrice: totalPrice,
      building: true,
   }
}

const setIgs = (state, action) => ({
   ...state,
   ingredients: action.ingredients,
   error: false,
   building: false,
})

const fetchIgsFailed = state => ({
   ...state,
   error: true,
})

const reducer = (state = initState, action) => {
   switch (action.type) {
      case types.ADD_INGREDIENT:
         return updtIg(state, action, 'add')
      case types.REMOVE_INGREDIENT:
         return updtIg(state, action, 'rmv')
      case types.SET_INGREDIENTS:
         return setIgs(state, action)
      case types.FETCH_INGREDIENTS_FAILED:
         return fetchIgsFailed(state)
      default:
         return state
   }
}

export default reducer
