import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVant from '@/plugins'

const app = createApp(App)
// 导入组件库use
getVant(app)
app.use(store)
app.use(router)
app.mount('#app')
