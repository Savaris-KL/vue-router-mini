import Vue from "vue";
import VueRouter from "./router/MiniRouter";
import App from "./App.vue";
import routes from "./router";

Vue.config.productionTip = false;

// router configs
Vue.use(VueRouter);
const router = new VueRouter(routes);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
