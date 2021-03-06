import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/icon.css'
import './assets/styles/global.less'
import i18n from "./lang";

Vue.config.productionTip = false

document.addEventListener('DOMContentLoaded', function () {
  var html = document.documentElement
  var i = 375
  var base = i / 100
  var width = html.clientWidth || 375
  if (width > 750) {
    width = 750
  }
  html.style.fontSize = width / base + 'px'
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
