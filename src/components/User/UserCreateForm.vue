<template>
  <div class="relative">
    <div
      v-show="sending"
      class="absolute top-0 right-0 bottom-0 left-0 bg-white/75 backdrop-blur-sm z-10"
    >
      <v-loader class="my-40" :loading="sending" />
    </div>

    <form @submit.stop="storeUser(data)">
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="">
            <ul class="flex flex-col gap-6">
              <li>
                <v-input-image
                  v-model="data.photo"
                  id="UserPhoto"
                  label="Photo"
                  :errors="errors.photo"
                  accept="image/jpg,image/jpeg"
                />
              </li>
            </ul>
          </div>
          <div class="">
            <ul class="flex flex-col gap-6">
              <li>
                <v-input
                  v-model="data.name"
                  id="UserName"
                  label="Name"
                  type="text"
                  :errors="errors.name"
                />
              </li>
              <li>
                <v-select
                  v-show="!isPositionsFetching"
                  v-model.number="data.position_id"
                  id="UserPosition"
                  label="Position"
                  size="lg"
                  :options="positions"
                  :errors="errors.position_id"
                />
              </li>
              <li>
                <v-input
                  v-model="data.email"
                  id="UserEmail"
                  label="Email"
                  type="email"
                  :errors="errors.email"
                />
              </li>
              <li>
                <v-input
                  v-model="data.phone"
                  id="UserPhone"
                  label="Phone number"
                  type="tel"
                  :errors="errors.phone"
                />
              </li>
            </ul>
          </div>
        </div>

        <div class="modal-footer flex flex-row justify-end items-center gap-2">
          <p class="mr-4 text-red-500">{{ errors.message }}</p>
          <button @click="$emit('close')" class="btn btn-md" type="button">Cancel</button>
          <button @click="storeUser(data)" class="btn btn-md bg-blue-500 text-white" type="button">
            Create
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores'

export default {
  name: 'UserCreateForm',

  data() {
    return {
      data: {
        position_id: -1,
        // name: null,
        // email: null,
        // phone: null,
        // photo: null,
        name: 'Frontend user',
        email: 'fasf@gmail.com',
        phone: '+380998887766',
        photo: null,
      },
    }
  },

  computed: {
    ...mapState(useUserStore, {
      positions: 'getPositions',
      isPositionsFetching: 'isPositionsFetching',

      errors: 'getErrors',

      sending: 'isSendingData',
    }),
  },

  methods: {
    ...mapActions(useUserStore, ['fetchUserPositions', 'storeUser']),
  },

  created() {
    this.fetchUserPositions()
  },
}
</script>
