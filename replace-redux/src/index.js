import React from 'react'
import ReactDOM from 'react-dom'
//import { Provider } from 'react-redux'
//import { combineReducers, createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App'
//import productReducer from './store/reducers/products'
import reportWebVitals from './reportWebVitals'
import ProductsProvider from './context/products'
//import configureStore from './hooks-store/store'
//configureStore()

// const rootReducer = combineReducers({
//    shop: productReducer,
// })

// const store = createStore(rootReducer)

ReactDOM.render(
   <React.StrictMode>
      {/*<Provider store={store}>*/}
      <ProductsProvider>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </ProductsProvider>
      {/*</Provider>*/}
   </React.StrictMode>,
   document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
