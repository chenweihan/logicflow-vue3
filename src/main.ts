import { createApp } from 'vue'
import router from './router';
//import { store, key } from './store';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue';

const app = createApp(App)
app
    .use(router)
	//.use(store, key)
	.use(ElementPlus)
    .mount('#app');
