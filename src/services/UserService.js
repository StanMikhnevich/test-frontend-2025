import ApiRequestProvider from '@/providers/ApiRequestProvider'
import CredentialsService from '@/services/CredentialsService.js'
import { buildQueryArrays } from '@/helpers/query'

export default {
  fetchUsers(filters) {
    return ApiRequestProvider._get(`v1/users?${buildQueryArrays(filters)}`)
  },

  fetchUserDetails(id) {
    return ApiRequestProvider._get(`v1/users/${id}`)
  },

  storeUser(data) {
    CredentialsService.nextToken()

    const formData = new FormData()

    formData.append('position_id', data.position_id)
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append(`photo`, data.photo)

    return ApiRequestProvider._post('v1/users', formData, {
      'Content-Type': 'multipart/form-data',
      Token: CredentialsService.getAccessToken(),
    })
  },

  fetchUserPositions() {
    return ApiRequestProvider._get('v1/positions')
  },

  queueWork() {
    return ApiRequestProvider._get('v1/queue')
  },
}
