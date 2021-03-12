import * as types from './types'

//SYNCHRONOUS FUNCTION TO BE USED BY THE
//ASYNCHRONOUS FUNCTION
export const saveResult = result => ({
   type: types.STORE_RESULT,
   res: result,
})

//ASYNCHRONOUS FUNCTION THAT NEVER REACHES THE
//REDUCER BUT DISPATCHES A SYNC FUNCTION
//TO THE REDUCER
export const storeResult = result => (dispatch, getState) =>
   setTimeout(() => {
      //const oldCounter = getState().ctr.counter
      //console.log(oldCounter)
      dispatch(saveResult(result))
   }, 2000)

export const deleteResult = resID => ({
   type: types.DEL_RESULT,
   id: resID,
})
