import axios from 'axios'
import queryString from 'query-string'

import { ENV } from '@/config'

const axiosInstance = axios.create({
  baseURL: ENV.API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) =>
    queryString.stringify(params, {
      skipEmptyString: true,
      skipNull: true,
    }),
})

axiosInstance.interceptors.request.use(
  function (config) {
    const token = window.localStorage.getItem('jwt')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    return Promise.reject(error)
  },
)

export default axiosInstance
