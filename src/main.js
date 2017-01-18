import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueMaterial  from 'vue-material'

/*mockData在接口尚未完成用于生成假数据，项目上线时不需引入*/
import mockData from './mock'



/*全局常量*/
global.API_PROXY = 'https://bird.ioliu.cn/v1/?url='


/*注册主题*/
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
Vue.material.registerTheme('whiteForm', {
  primary: 'white',
  accent: 'deep-orange',
  warn: 'red',
  background: 'white'
})



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

