import { config } from '@/config'

import axios from 'axios'

const makeUrl = (endpoint) => `${config.api}/${endpoint}`

const makeHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}

export default {
  async _get(endpoint, data = {}, headers) {
    return this.sendRequest('get', endpoint, data, headers)
  },

  async _post(endpoint, data = {}, headers) {
    return this.sendRequest('post', endpoint, data, headers)
  },

  async _patch(endpoint, data = {}, headers) {
    return this.sendRequest('patch', endpoint, data, headers)
  },

  async _put(endpoint, data = {}, headers) {
    return this.sendRequest('put', endpoint, data, headers)
  },

  async _delete(endpoint, data = {}, headers) {
    return this.sendRequest('delete', endpoint, data, headers)
  },

  async sendRequest(method, endpoint, data = {}, headers) {
    headers = { ...makeHeaders(), ...headers }
    return axios({
      method,
      url: makeUrl(endpoint),
      data,
      headers,
    })
  },
}
