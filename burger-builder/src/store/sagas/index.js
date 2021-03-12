import { takeEvery, all } from 'redux-saga/effects'
import * as types from '../actions/types'
import {
   logoutSaga,
   checkAuthTimeoutSaga,
   authSaga,
   authCheckStateSaga,
} from './auth'
import { initIngredientsSaga } from './burguerBuilder'

//HERE THE ORDER OF THE SAGAS DOESNT MATTER
//NOR THE YIELD MEANS THAT ONE WAITS FOR THE OTHER TO FINISH
export function* watchAuth() {
   yield all([
      takeEvery(types.AUTH_INITIATE_LOGOUT, logoutSaga),
      takeEvery(types.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
      takeEvery(types.AUTH, authSaga),
      takeEvery(types.AUTH_CHECK_STATE, authCheckStateSaga),
   ])
}

export function* watchBurgerBuilder() {
   yield takeEvery(types.INIT_INGREDIENTS, initIngredientsSaga)
}
