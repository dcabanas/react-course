import { put } from 'redux-saga/effects'
import * as actionCreators from '../actions/index'
import axios from '../../axios-orders'

export function* initIngredientsSaga() {
   try {
      const res = yield axios.get('ingredients.json')
      yield put(actionCreators.setIngredients(res.data))
   } catch (error) {
      yield put(actionCreators.fetchIngredientsFailed())
   }
}
