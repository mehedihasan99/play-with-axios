import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
})

// * request interceptors
const token = '12345'
api.interceptors.request.use(
  (config) => {
    // console.log(config)
    config.headers['Authorization'] = 'Bearer ' + token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// * response interceptors
api.interceptors.response.use(
  (response) => {
    console.log(response)
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default api
