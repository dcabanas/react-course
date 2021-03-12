/* eslint-disable default-case */
import * as types from '../actions/types'

const initState = {
   counter: 0,
}

const reducer = (state = initState, action) => {
   switch (action.type) {
      case types.INCREMENT:
         return {
            ...state,
            counter: state.counter + 1,
         }
      case types.DECREMENT:
         return {
            ...state,
            counter: state.counter - 1,
         }
      case types.ADD:
         return {
            ...state,
            counter: state.counter + action.payload,
         }
      case types.SUBTRACT:
         return {
            ...state,
            counter: state.counter - action.payload,
         }
      default:
         return state
   }
}

export default reducer
