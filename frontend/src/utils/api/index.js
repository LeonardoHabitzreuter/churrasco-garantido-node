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

const interceptorBeforeRequest = (instance) => {
  instance.interceptors.request.use((config) => {
    config.headers = config.headers || {}

    const accessToken = getLocalStorage(TOKEN)

    if (accessToken) {
      config.headers.common['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  }, (error) => {
    return Promise.reject(error)
  })
}

const logon = ({ email, senha }) => {
  Axios
    .post(`${BASE_API_URL}/login`, { email, senha })
    .then(response => response.data.token)
    .then(token => saveLocalStorage(CURRENT_USER, token))
}

const logout = () => {
  clearLocalStorage()
}

const getUser = () => {
  return getLocalStorage(CURRENT_USER)
}

const api = () => {
  const axiosInstance = createAxiosInstance()

  interceptorBeforeRequest(axiosInstance)

  return {
    get: (url, params) => {
      const query = qs.stringify(params)
      return axiosInstance.get(`${url}?${query}`)
    },
    post: (url, data) => axiosInstance.post(url, data),
    delete: url => axiosInstance.delete(url),
    put: (url, data) => axiosInstance.put(url, data),
    patch: (url, data) => axiosInstance.patch(url, data),
    logon,
    logout,
    getUser
  }
}

export default api()
