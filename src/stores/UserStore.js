import { defineStore } from 'pinia'
import UserService from '@/services/UserService'
import CredentialsService from '@/services/CredentialsService.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    userDetails: {},
    options: {
      positions: [],
    },
    errors: {},
    filter: {
      page: 1,
      count: 6,
    },
    loading: {
      users: false,
      userDetails: false,
      positions: false,
      sending: false,
      queue: false,
    },
    modal: {
      create: false,
    },
  }),

  getters: {
    getUsers: (state) => state.users,
    isUsersFetching: (state) => state.loading.users,

    getUserDetails: (state) => state.userDetails,
    isUserDetailsFetching: (state) => state.loading.userDetails,

    getPositions: (state) => state.options.positions,
    isPositionsFetching: (state) => state.loading.positions,

    isQueueWorking: (state) => state.loading.queue,

    getErrors: (state) => state.errors,

    getFilter: (state) => state.filter,

    isModalCreateOpened: (state) => state.modal.create,
  },

  actions: {
    async fetchUsers(filter) {
      this.loading.users = true

      const res = await UserService.fetchUsers(filter)

      try {
        this.users = res.data.users
      } catch (e) {
        this.users = []
      } finally {
        this.loading.users = false
      }
    },

    async fetchUserDetails(id) {
      this.loading.userDetails = true

      try {
        const res = await UserService.fetchUserDetails(id)

        this.userDetails = res.data.user
      } catch (e) {
        this.userDetails = {}

        if (e.response.status === 404) {
          this.errors.message = e.response.data.message
        }
      } finally {
        this.loading.userDetails = false
      }
      this.loading.userDetails = false
    },

    async storeUser(user) {
      this.loading.sending = true
      this.errors = {}
      await CredentialsService.nextToken()

      try {
        const res = await UserService.storeUser(user)

        if (res.data.success) {
          await CredentialsService.clear()
          this.hideUserModal('create')
          await this.fetchUsers(this.filter)
          // await this.queueWork()
        }
      } catch (e) {
        if (e.response.status === 401) {
          await CredentialsService.clear()
          this.errors.message = e.response.data.message
        }

        if (e.response.status === 409) {
          this.errors.message = e.response.data.message
        }

        if (e.response.status === 422) {
          this.errors = e.response.data.errors
          this.errors.message = e.response.data.message
        }
      } finally {
        this.loading.sending = false
      }
    },

    async fetchUserPositions() {
      this.loading.positions = true

      const res = await UserService.fetchUserPositions()

      try {
        if (res.data.success) {
          this.options.positions = res.data.positions
        }
      } catch (e) {
        //
      } finally {
        this.loading.positions = false
      }
    },

    async queueWork() {
      this.loading.queue = true

      try {
        await UserService.queueWork()
      } catch (e) {
      } finally {
        this.loading.queue = false
      }
    },

    showUserModal(name) {
      this.modal[name] = true
    },

    hideUserModal(name) {
      this.modal[name] = false
    },
  },
})
