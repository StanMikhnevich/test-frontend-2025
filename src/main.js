import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import components from '@/components/ui';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Register global components
components.forEach(component => {
  app.component(component.name, component)
})

app.mount('#app')
