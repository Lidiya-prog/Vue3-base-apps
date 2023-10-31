import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

// createApp(App).mount('#app');

const app = createApp(App);
const vm = app.mount('#app'); // Монтируйте приложение на элемент с id "app"

// Предоставьте доступ к vm в глобальную область видимости
window.vm = vm;
