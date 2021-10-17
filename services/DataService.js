export default {

  delete: async function(url, body={}) {
    return await this.request('DELETE', url, body)
  },

  post: async function(url, body) {
    return await this.request('POST', url, body)
  },

  put: async function(url, body) {
    return await this.request('PUT', url, body)
  },

  request: async function(method, url, body) {
    const requestConfig = this.setRequestConfig(method, body);
    const response = await fetch(url, requestConfig)
    try {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      throw error
    }
  },

  setRequestConfig(method, body){
    const requestConfig = {
      method: method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    if (method !== 'GET' && this.isAuthenticated()) {
    const token = localStorage.getItem('AUTH_TOKEN')
    requestConfig.headers['Authorization'] = `Bearer ${token}`
    }
    return requestConfig;
  },

  registerUser: async function(username, password) {
    const url = 'http://localhost:8000/auth/register'
    return await this.post(url, {username, password})
  },

  login: async function(username, password) {
    const url = 'http://localhost:8000/auth/login'
    const data = await this.post(url, {username, password})
    const token = data.accessToken
    localStorage.setItem('AUTH_TOKEN', token)
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
