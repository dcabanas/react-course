import reducer from './auth'
import * as types from '../actions/types'

describe('auth reducer', () => {
   it('should return the init state', () => {
      expect(reducer(undefined, {})).toEqual({
         token: null,
         userID: null,
         error: null,
         loading: false,
         authRedirectPath: '/',
      })
   })

   it('should store token upon login', () => {
      expect(
         reducer(
            {
               token: null,
               userID: null,
               error: null,
               loading: false,
               authRedirectPath: '/',
            },
            {
               type: types.AUTH_SUCCESS,
               idToken: 'some-token',
               userId: 'some-user-id',
            }
         )
      ).toEqual({
         token: 'some-token',
         userID: 'some-user-id',
         error: null,
         loading: false,
         authRedirectPath: '/',
      })
   })
})
