import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import Unicon from 'vue-unicons'
import { uniTimesCircle, uniCheckCircle} from 'vue-unicons/dist/icons'

Unicon.add([uniTimesCircle, uniCheckCircle])

createApp(App).use(Unicon).mount('#app')
