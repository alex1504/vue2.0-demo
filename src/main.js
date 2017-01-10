import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial  from 'vue-material'
import mockData from './mock'
import infiniteScroll from "vue-infinite-scroll"

global.API_PROXY = 'https://bird.ioliu.cn/v1/?url='

Vue.use(infiniteScroll)

Vue.use(VueMaterial)
Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'red',
  warn: 'red',
  background: 'white'
})
Vue.material.registerTheme('blue', {
  primary: 'blue',
  accent: 'red',
  warn: 'red',
  background: 'white'
})
Vue.material.registerTheme('teal', {
  primary: 'teal',
  accent: 'red',
  warn: 'red',
  background: 'white'
})
Vue.material.registerTheme('brown', {
  primary: 'brown',
  accent: 'red',
  warn: 'red',
  background: 'white'
})
Vue.material.registerTheme('indigo', {
  primary: 'indigo',
  accent: 'red',
  warn: 'red',
  background: 'white'
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

