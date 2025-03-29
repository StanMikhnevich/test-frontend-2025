import { config } from '@/config'
import ApiRequestProvider from '@/providers/ApiRequestProvider'

export default {
  async nextToken() {
    if (this.isAccessTokenExpired()) {
      const token = await this.fetchAccessToken()
      this.setAccessToken(token.data.token)
    }
  },

  fetchAccessToken() {
    return ApiRequestProvider._get(`v1/token`)
  },

  setAccessToken(token) {
    const expires = new Date().setTime(new Date().valueOf() + config.tokenExpiration)
    localStorage.setItem('accessToken', token)
    localStorage.setItem('accessTokenExpiration', expires)
  },

  getAccessToken() {
    return localStorage.getItem('accessToken')
  },

  getAccessExpiration() {
    return localStorage.getItem('accessTokenExpiration')
  },

  isAccessTokenExpired() {
    return new Date().valueOf() > this.getAccessExpiration()
  },

  clear() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('accessTokenExpiration')
  },
}
