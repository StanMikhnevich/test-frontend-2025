import UsersListView from '@/views/Users/UsersListView.vue'
import UserDetailsView from '@/views/Users/UserDetailsView.vue'

export const userRoutes = [
  {
    path: '/users',
    component: UsersListView,
  },
  {
    path: '/users/:user',
    component: UserDetailsView,
  },
]
