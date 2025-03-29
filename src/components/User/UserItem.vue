<template>
  <tr class="user-item odd:bg-slate-200">
    <td>
      <router-link :to="`/users/${user.id}`">
        <img
          :src="user.photo"
          :alt="user.name"
          class="min-w-[70px] w-[70px] min-h-[70px] h-[70px] p-1 rounded-full"
        />
      </router-link>
    </td>
    <td>
      <h4 class="font-semibold text-blue-500">
        <router-link :to="`/users/${user.id}`">{{ user.name }}</router-link>
      </h4>
    </td>
    <td>{{ user.position }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.phone }}</td>
  </tr>
</template>

<script>
export default {
  name: 'UserItem',

  props: {
    user: Object,
  },
}
</script>
