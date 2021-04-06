import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import CustomerList from './views/customer/CustomerList.vue'
import EmployeeList from './views/employee/EmployeeList.vue'
import ReportList from './views/report/ReportList.vue'
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
Vue.config.productionTip = false

//1. Định nghĩa các path:
const routes = [
  { path: '/customer', component: CustomerList },
  { path: '/employee', component: EmployeeList },
  { path: '/report', component: ReportList }
]
//2. Khởi tạo router:
const router = new VueRouter({
  routes // short for `routes: routes`
})

//3. Khai báo sử dụng Vue-Router và VueFilterDateFormat:
Vue.use(VueRouter)
Vue.use(VueFilterDateFormat);
//Filter salary
var numeral = require("numeral");

Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
