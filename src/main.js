import Vue from 'vue';
import App from './App.vue';

// import alertFunc from './modules/alertFunc';
// import { message, anotherMessage } from './modules/text';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

// alertFunc(message);
// alertFunc(anotherMessage);
