import axios from 'axios'

// Creates an Axios instance used for all requests with the same base URL.
const api = axios.create({
  baseURL: 'http://localhost:8000', // Backend API base URL.
})

// Adds the token to every request if it exists.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    // Sends the user's JWT token to access protected routes.
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Checks every response and handles errors.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Do not redirect for login failures, but let the UI handle them.
    const url = error.config?.url || ''
    if (error.response?.status === 401 && !url.includes('/login')) {
      // Removes the invalid token.
      localStorage.removeItem('token')
      // Redirects the user to the login (home) page.
      window.location.href = '/'
    }
    // Rejects the promise so that the error can be handled.
    return Promise.reject(error)
  }
)

export default api
