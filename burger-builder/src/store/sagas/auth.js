import { put, delay } from 'redux-saga/effects'
import * as actionCreators from '../actions/index'
import axios from 'axios'

const API_KEY = 'AIzaSyCTfGN6hZK-b_hCtzNo81IBfs0CK-H_6lg'

export function* logoutSaga() {
   localStorage.removeItem('token')
   localStorage.removeItem('expirationDate')
   localStorage.removeItem('userId')
   yield put(actionCreators.logoutSuccess())
}

export function* checkAuthTimeoutSaga(action) {
   yield delay(action.expirationTime * 1000)
   yield put(actionCreators.logout())
}

export function* authSaga(action) {
   yield put(actionCreators.authStart())
   const authData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true,
   }
   let url = 'https://identitytoolkit.googleapis.com/v1/accounts:'
   if (!action.isSignUp) {
      url += 'signInWithPassword?key='
   } else {
      url += 'signUp?key='
   }
   try {
      const res = yield axios.post(`${url}${API_KEY}`, authData)

      const expirationDate = new Date(
         new Date().getTime() + res.data.expiresIn * 1000
      )
      localStorage.setItem('token', res.data.idToken)
      localStorage.setItem('expirationDate', expirationDate)
      localStorage.setItem('userId', res.data.localId)
      yield put(actionCreators.authSuccess(res.data.idToken, res.data.localId))
      yield put(actionCreators.checkAuthTimeout(res.data.expiresIn))
   } catch (error) {
      yield put(actionCreators.authFail(error.response.data.error))
   }
}

export function* authCheckStateSaga() {
   const token = localStorage.getItem('token')
   if (!token) {
      yield put(actionCreators.logout())
   } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
         yield put(actionCreators.logout())
      } else {
         const userId = localStorage.getItem('userId')
         yield put(actionCreators.authSuccess(token, userId))
         yield put(
            actionCreators.checkAuthTimeout(
               (expirationDate.getTime() - new Date().getTime()) / 1000
            )
         )
      }
   }
}
