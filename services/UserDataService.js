import RequestsService from "./RequestsService.js"

export default {

  registerUser: async function(username, password) {
    const url = 'http://localhost:8000/auth/register'
    return await RequestsService.post(url, {username, password})
  },

  login: async function(username, password) {
    const url = 'http://localhost:8000/auth/login'
    const data = await RequestsService.post(url, {username, password})
    const token = data.accessToken
    localStorage.setItem('AUTH_TOKEN', token);
    return this.isAuthenticated;
  },

  isAuthenticated: function() {
    return localStorage.getItem('AUTH_TOKEN') !== null
  },

  getAuthUserId: function() {
    const token = localStorage.getItem('AUTH_TOKEN')
    if (token === null) {
      return null
    }
    const b64Parts = token.split('.')
    if (b64Parts.length !== 3) {
      return null
    }
    const b64Data = b64Parts[1]
    try {
      const userJSON = atob(b64Data)
      const user = JSON.parse(userJSON)
      return user.userId
    } catch (error) {
      console.error('Error while decoding JWT Token', error)
      return null
    }
  }

}
