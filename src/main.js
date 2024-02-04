import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);

app.config.globalProperties.$http = axios.create({
  baseURL: 'http://localhost:3000', // Adjust the baseURL based on your JSON server location
});

app.mount('#app');






