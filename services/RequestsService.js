import UserDataService from "./UserDataService.js"

export default {

  get: async function(url) {
    return await this.request('GET', url)
  },
  
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
    if (method !== 'GET' && UserDataService.isAuthenticated()) {
    const token = localStorage.getItem('AUTH_TOKEN')
    requestConfig.headers['Authorization'] = `Bearer ${token}`
    }
    return requestConfig;
  },
}