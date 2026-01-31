import "./assets/main.css";
import "primeicons/primeicons.css";

import App from "./App.vue";
import Aura from "@primeuix/themes/aura";
import { createApp } from "vue";
import { createPinia } from "pinia";
import ConfirmationService from "primevue/confirmationservice";
import PrimeVue from "primevue/config";

import router from "./router";

const pinia = createPinia();
const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(pinia);
app.use(router);
app.use(ConfirmationService);
app.mount("#app");
