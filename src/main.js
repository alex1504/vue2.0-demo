import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueMaterial from 'vue-material'
import VueTouch from 'vue-touch'

/* mockData 在接口尚未完成用于生成假数据，项目上线时不需引入 */
import mockData from './mock'

/*注册主题*/
Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
    primary: 'blue',
    accent: 'red',
    warn: 'red',
    background: 'white'
});
Vue.material.registerTheme('blue', {
    primary: 'blue',
    accent: 'red',
    warn: 'red',
    background: 'white'
});
Vue.material.registerTheme('teal', {
    primary: 'teal',
    accent: 'red',
    warn: 'red',
    background: 'white'
});
Vue.material.registerTheme('brown', {
    primary: 'brown',
    accent: 'red',
    warn: 'red',
    background: 'white'
});
Vue.material.registerTheme('indigo', {
    primary: 'indigo',
    accent: 'red',
    warn: 'red',
    background: 'white'
});
Vue.material.registerTheme('whiteForm', {
    primary: 'white',
    accent: 'deep-orange',
    warn: 'red',
    background: 'white'
});

/*老版本vue-touch不兼容2.0，会报错 Cannot read property 'priority' of undefined，请使用vue-touch@next版本*/
Vue.use(VueTouch, {name: 'v-touch'});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

