import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

//全局路由守卫
router.beforeEach((to, from, next) => {
  
  next();
})
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

