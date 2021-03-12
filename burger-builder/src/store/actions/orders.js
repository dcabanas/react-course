import * as types from './types'
import axios from '../../axios-orders'

const purchaseSuccess = (id, orderData) => ({
   type: types.PURCHASE_SUCCESS,
   orderID: id,
   orderData: orderData,
})

const purchaseFail = error => ({
   type: types.PURCHASE_FAIL,
   error: error,
})

const purchaseStart = () => ({
   type: types.PURCHASE_START,
})

//ASYNC CODE
export const purchase = (orderData, token) => dispatch => {
   dispatch(purchaseStart())
   axios
      .post(`orders.json?auth=${token}`, orderData)
      .then(response => {
         dispatch(purchaseSuccess(response.data.id, orderData))
      })
      .catch(error => {
         dispatch(purchaseFail(error))
      })
}

export const purchaseInit = () => ({
   type: types.PURCHASE_INIT,
})

const fetchOrdersSuccess = orders => ({
   type: types.FETCH_ORDERS_SUCCESS,
   orders: orders,
})

const fetchOrdersFail = error => ({
   type: types.FETCH_ORDERS_FAIL,
   error: error,
})

const fetchOrdersStart = () => ({
   type: types.FETCH_ORDERS_START,
})

//ASYNC CODE
export const fetchOrders = (token, userId) => dispatch => {
   dispatch(fetchOrdersStart())
   const queryParams =
      '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
   axios
      .get(`orders.json${queryParams}`)
      .then(res => {
         const fetchedOrders = []
         Object.keys(res.data).forEach(key =>
            fetchedOrders.push({
               id: key,
               ...res.data[key],
            })
         )
         dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch(error => {
         dispatch(fetchOrdersFail(error))
      })
}
