import * as types from '../actions/types'

const initState = {
   results: [],
}

const reducer = (state = initState, action) => {
   switch (action.type) {
      case types.STORE_RESULT:
         return {
            ...state,
            results: state.results.concat({
               id: new Date(),
               value: action.res,
            }),
         }
      case types.DEL_RESULT:
         return {
            ...state,
            results: state.results.filter(res => res.id !== action.id),
         }
      default:
         return state
   }
}

export default reducer
