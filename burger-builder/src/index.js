import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import ordersReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth'
import { watchAuth, watchBurgerBuilder } from './store/sagas/index'

const composeEnhancers =
   'development' === process.env.NODE_ENV
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose

const rootReducer = combineReducers({
   burgBld: burgerBuilderReducer,
   ords: ordersReducer,
   auth: authReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
)

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
