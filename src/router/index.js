import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const router = new VueRouter({
  base: '/vue2.0-demo/',
	routes:[
  {
    name: 'home',
    path:'/home',
    component: require('../views/home/home.vue'),
    children: [
        {
          path: 'movie',
          name: 'movie',
          component: require('../components/movie/movie.vue'),
        },
        {
          path: 'music',
          name: 'music',
          component: require('../components/music/music.vue'),
        },
        {
          path: 'book',
          name: 'book',
          component: require('../components/book/book.vue')
        },
        {
          path: 'photo',
          name: 'photo',
          component: require('../components/photo/photo.vue')
        }
      ]
  },
  {
    name: 'login', path:'/login',component: require('../views/login/login.vue')
  },  
  {
    path: '/home/movie/detail/:id',
    name: 'movie-detail',
    component: require('../components/movie/movie_detail.vue'),
  },
  {
    path:'*', redirect: './login'
  }]

});


export default router;