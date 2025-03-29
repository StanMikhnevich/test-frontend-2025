<template>
  <v-page-loader :loading="isUserDetailsFetching" />

  <section class="px-6 md:container md:mx-auto mt-20 flex flex-col gap-4">
    <nav class="flex flex-row justify-between items-center gap-4">
      <ul class="flex flex-row items-center gap-4">
        <li class="font-semibold">
          <router-link :to="`/users`">← Back</router-link>
        </li>
      </ul>
    </nav>

    <div v-if="hasErrors" class="mt-20 text-center text-xl">
      {{ errors.message }}
    </div>

    <div
      v-else-if="!isUserDetailsFetching"
      class="mt-20 grid grid-cols-1 md:grid-cols-2 items-center gap-6"
    >
      <div class="user-image flex justify-end users-center">
        <img
          :src="user.photo"
          :alt="user.name"
          class="min-w-[70px] w-[70px] min-h-[70px] h-[70px] mx-auto rounded-full"
        />
      </div>

      <div class="user-info text-xl">
        <ul class="w-full flex flex-col items-center md:items-start gap-6 leading-normal">
          <li class="col-span-full">
            <h2 class="font-semibold text-3xl">{{ user.name }}</h2>
            {{ user.position }}
            <p></p>
          </li>

          <li>
            <span class="font-semibold text-sm">Email</span>
            <p class="flex flex-row">
              {{ user.email }}
            </p>
          </li>

          <li>
            <span class="font-semibold text-sm">Phone</span>
            <p class="flex flex-row">
              {{ user.phone }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores'

export default {
  name: 'UserDetailsView',

  data() {
    return {}
  },

  computed: {
    id() {
      return this.$route.params.user
    },

    hasErrors() {
      return this.errors?.message?.length > 0
    },

    ...mapState(useUserStore, {
      user: 'getUserDetails',
      isUserDetailsFetching: 'isUserDetailsFetching',

      errors: 'getErrors',
    }),
  },

  methods: {
    ...mapActions(useUserStore, ['fetchUserDetails', 'showUserModal', 'hideUserModal']),
  },

  async created() {
    await this.fetchUserDetails(this.id)
  },
}
</script>
