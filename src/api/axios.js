import axios from 'axios'
const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api'
// const URL = 'http://localhost:3000/api'

const  instace = axios.create({
    baseURL:  URL,
    withCredentials: true

})

export default instace