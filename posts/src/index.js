import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'
axios.defaults.headers.post['Content-Type'] = 'application/json'

//WE ALWAYS NEED TO RETURN THE REQUEST OR THE REQUEST CONFIG
//OTHERWISE THIS WILL BLOCK ALL HTTP REQUESTS IN THE APPLICATION
axios.interceptors.request.use(
   request => {
      console.log(request)
      //EDIT REQUEST
      return request
   },
   error => {
      console.log(error)
      //HERE WE RETURN LIKE THIS BECAUSE
      //IT CAN BE USED ON ANY PLACE IN OUR APPLICATION
      //WITH THE .catch() METHOD
      return Promise.reject(error)
   }
)

axios.interceptors.response.use(
   response => {
      console.log(response)
      //EDIT REQUEST
      return response
   },
   error => {
      console.log(error)
      //HERE WE RETURN LIKE THIS BECAUSE
      //IT CAN BE USED ON ANY PLACE IN OUR APPLICATION
      //WITH THE .catch() METHOD
      return Promise.reject(error)
   }
)

ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
