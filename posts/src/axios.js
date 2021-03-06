import axios from 'axios'

//INSTANCES OVERIDE DEFAULT CONFIG
const instance = axios.create({
   baseURL: 'https://jsonplaceholder.typicode.com',
})

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE'
//instance.interceptors.request...

export default instance
