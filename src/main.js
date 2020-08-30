import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import { $get, $post, $axios } from "./plugins/axios";
Vue.prototype.$get = $get;
Vue.prototype.$post = $post;
Vue.prototype.$axios = $axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
