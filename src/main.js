import Vue from 'vue';
import App from './App.vue';
import {router} from './router';
import store from './store';


import './assets/css/common.css';
import '@service/element-ui';
import VueHighlightJS from 'vue-highlightjs';
import 'highlight.js/styles/monokai-sublime.css'
Vue.use(VueHighlightJS);
Vue.config.productionTip = false;
console.log()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
