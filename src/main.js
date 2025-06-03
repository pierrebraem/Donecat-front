import './assets/main.css'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ConfirmationService from 'primevue/confirmationservice'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.use(router)
app.use(ConfirmationService)
app.mount('#app')