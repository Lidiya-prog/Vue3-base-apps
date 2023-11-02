import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

// createApp(App).mount('#app');

const app = createApp(App);

// доступ к vm в глобальную область видимости
window.vm = app.mount('#app');
