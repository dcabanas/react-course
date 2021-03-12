import * as types from './types'

export const authStart = () => ({
   type: types.AUTH_START,
})

export const authSuccess = (tokenId, userId) => ({
   type: types.AUTH_SUCCESS,
   idToken: tokenId,
   userId: userId,
})

export const authFail = error => ({
   type: types.AUTH_FAIL,
   error: error,
})

//ASYNC CODE
//THIS DIDNT NEED A SAGA, COULD HAVE BE DONE HERE
export const logout = () => ({
   type: types.AUTH_INITIATE_LOGOUT,
})

export const logoutSuccess = () => ({
   type: types.AUTH_LOGOUT,
})

//ASYNC CODE
export const checkAuthTimeout = expirationTime => ({
   type: types.AUTH_CHECK_TIMEOUT,
   expirationTime: expirationTime,
})

//ASYNC CODE
export const auth = (email, password, isSignUp) => ({
   type: types.AUTH,
   email: email,
   password: password,
   isSignUp: isSignUp,
})

export const setAuthRedirectPath = path => ({
   type: types.SET_AUTH_REDIRECT_PATH,
   path: path,
})

//ASYNC CODE
export const authCheckState = () => ({
   type: types.AUTH_CHECK_STATE,
})
