import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
	routes:[
  {
    name: 'home',
    path:'/home',
    component: require('../views/home.vue'),
    children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'movie',
          name: 'movie',
          component: require('../components/movie.vue')
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'music',
          name: 'music',
          component: require('../components/music.vue')
        }
      ]
  },
  {
    path:'/login',component: require('../views/login.vue')
  },
  {
    path:'*',redirect:'/home/movie'
  }]
});



export default router;