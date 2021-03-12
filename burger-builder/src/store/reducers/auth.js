import * as types from '../actions/types'

const initState = {
   token: null,
   userID: null,
   error: null,
   loading: false,
   authRedirectPath: '/',
}

const authStart = state => ({
   ...state,
   error: null,
   loading: true,
})

const authSuccess = action => ({
   token: action.idToken,
   userID: action.userId,
   error: null,
   loading: false,
})

const authFail = (state, action) => ({
   ...state,
   error: action.error,
   loading: false,
})

const authLogout = state => ({
   ...state,
   token: null,
   userID: null,
})

const setAuthRedirectPath = (state, action) => ({
   ...state,
   authRedirectPath: action.path,
})

const reducer = (state = initState, action) => {
   switch (action.type) {
      case types.AUTH_START:
         return authStart(state)
      case types.AUTH_SUCCESS:
         return authSuccess(action)
      case types.AUTH_FAIL:
         return authFail(state, action)
      case types.AUTH_LOGOUT:
         return authLogout(state)
      case types.SET_AUTH_REDIRECT_PATH:
         return setAuthRedirectPath(state, action)
      default:
         return state
   }
}

export default reducer
