import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const router = new VueRouter({
  base: '/vue2.0-demo/',
	routes:[
  {
    name: 'home',
    path:'/home',
    component: require('../views/home.vue'),
    children: [
        {
          path: 'movie',
          name: 'movie',
          component: require('../components/movie.vue')
        },
        {
          path: 'music',
          name: 'music',
          component: require('../components/music.vue')
        },
        {
          path: 'book',
          name: 'book',
          component: require('../components/book.vue')
        },
        {
          path: 'photo',
          name: 'photo',
          component: require('../components/photo.vue')
        }
      ]
  },
  {
    path:'/login',component: require('../views/login.vue')
  },  
  {
    path:'*', redirect: './home/movie'
  }]
});



export default router;