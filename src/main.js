import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import './assets/form-item-input.css';
import './assets/form-upload-img-item.css';

import axios from 'axios';
import Qs from 'qs';

Vue.prototype.$axios = axios;
Vue.prototype.$qs = Qs;

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
