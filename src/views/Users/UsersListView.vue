<template>
  <v-page-loader :loading="isUsersFetching" />

  <section class="px-6 md:container md:mx-auto mt-20 flex flex-col gap-4">
    <nav class="flex flex-row justify-between items-center gap-4">
      <ul class="flex flex-row items-center gap-2">
        <li>
          <h1 class="text-xl font-semibold">Users</h1>
        </li>
      </ul>
      <ul class="flex flex-row items-center gap-2">
        <li>
          <div class="p-2 cursor-pointer" @click="showUserModal('create')">+</div>
        </li>
      </ul>
    </nav>

    <div class="overflow-x-auto">
      <table class="w-full font-mono whitespace-nowrap">
        <thead>
          <tr class="font-semibold">
            <td></td>
            <td>Name</td>
            <td>Position</td>
            <td>Email</td>
            <td>Phone</td>
          </tr>
        </thead>
        <UserItem v-for="user in users" :key="user.id" :user="user" />
      </table>
    </div>

    <v-pagination
      v-model.number="filter.page"
      :page="filter.page"
      v-on:update:modelValue="fetchUsers(filter)"
    />
  </section>

  <v-modal
    v-show="isUserCreateModalOpened"
    @hide="hideUserModal('create')"
    w="w-full md:w-4/5"
    title="Create user"
  >
    <UserCreateForm />
  </v-modal>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores'
import UserItem from '@/components/User/UserItem.vue'
import UserCreateForm from '@/components/User/UserCreateForm.vue'

export default {
  name: 'UsersListView',

  components: {
    UserItem,
    UserCreateForm,
  },

  computed: {
    ...mapState(useUserStore, {
      filter: 'getFilter',

      users: 'getUsers',
      isUsersFetching: 'isUsersFetching',

      positions: 'getPositions',
      isPositionsFetching: 'isPositionsFetching',

      isUserCreateModalOpened: 'isModalCreateOpened',
    }),
  },

  methods: {
    ...mapActions(useUserStore, [
      'fetchUsers',

      'fetchUserPositions',

      'showUserModal',
      'hideUserModal',
    ]),
  },

  created() {
    this.fetchUserPositions()
    this.fetchUsers(this.filter)
  },
}
</script>
