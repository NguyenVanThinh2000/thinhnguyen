import axios from 'axios'
import queryString from 'query-string'

const axiosInstance = axios.create({
  baseURL: 'https://thinhnguyen-be.vercel.app/api',
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
