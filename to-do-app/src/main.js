import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false

Vue.use(Toast, {
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
