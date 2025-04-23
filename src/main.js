import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import piniaPersistedstate from "pinia-plugin-persistedstate"

// v-calendar
import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

const pinia = createPinia();
pinia.use(piniaPersistedstate);

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(setupCalendar, {})
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)
app.mount('#app');