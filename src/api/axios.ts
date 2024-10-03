import axios from 'axios'
import queryString from 'query-string'

import { ENV } from '@/config'

const axiosInstance = axios.create({
  baseURL: ENV.API_URL + '/api',
  headers: {},
  paramsSerializer: (params) =>
    queryString.stringify(params, {
      skipEmptyString: true,
      skipNull: true,
    }),
})

axiosInstance.interceptors.request.use(
  function (config) {
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
