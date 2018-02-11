import Axios from 'axios'
import qs from 'qs'
import { saveLocalStorage, getLocalStorage, clearLocalStorage } from 'utils/storage'
import { BASE_API_URL } from './settings'

const CURRENT_USER = 'CURRENT_USER'
const TOKEN = 'TOKEN'

const createAxiosInstance = () => (
  Axios.create({
    baseURL: BASE_API_URL,
    timeout: 180000,
    headers: { 'Content-Type': 'application/json' }
  })
)

const axiosBeforeRequest = (instance) => {
  instance.interceptors.request.use((config) => {
    config.headers = config.headers || {}

    const accessToken = getLocalStorage(TOKEN)
    if (accessToken) {
      config.headers.common['authorization'] = accessToken
    }

    return config
  }, (error) => {
    return Promise.reject(error)
  })
}

const logon = ({ email, password }) => (
  Axios
    .post(`${BASE_API_URL}/login`, { email, password })
    .then(response => {
      saveLocalStorage(TOKEN, response.data.token)
      saveLocalStorage(CURRENT_USER, response.data.userId)
    })
)

const signup = ({ name, email, password, confirmPassword }) => (
  Axios
    .post(`${BASE_API_URL}/signup`, { name, email, password, confirmPassword })
    .then(response => {
      saveLocalStorage(TOKEN, response.data.token)
      saveLocalStorage(CURRENT_USER, response.data.userId)
    })
)

const logout = () => {
  clearLocalStorage()
}

const getUser = () => {
  return getLocalStorage(CURRENT_USER)
}

const api = () => {
  const axiosInstance = createAxiosInstance()

  axiosBeforeRequest(axiosInstance)

  return {
    get: (url, params) => {
      const query = qs.stringify(params)
      return axiosInstance.get(`/api/${url}?${query}`)
    },
    post: (url, data) => axiosInstance.post(`/api/${url}`, data),
    delete: url => axiosInstance.delete(`/api/${url}`),
    put: (url, data) => axiosInstance.put(`/api/${url}`, data),
    patch: (url, data) => axiosInstance.patch(`/api/${url}`, data),
    logon,
    signup,
    logout,
    getUser
  }
}

export default api()
