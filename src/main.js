import Vue from 'vue';
import App from './App.vue';
import {router} from './router';
import store from './store';
import MetaInfo from 'vue-meta-info'  // 使用meta插件便于seo
import './assets/css/common.less';
import '@service/element-ui';
import VueHighlightJS from 'vue-highlightjs';
import 'highlight.js/styles/monokai-sublime.css'

Vue.use(VueHighlightJS);
Vue.use(MetaInfo)  // 使用meta
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
