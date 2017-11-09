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
    name: 'regist', path:'/regist',component: require('../views/regist/regist.vue')
  },  
  {
    path: '/home/movie/detail/:id',
    name: 'movie-detail',
    component: require('../components/movie/movie_detail.vue'),
  },
  {
    path: '/home/music/list/:listId',
    name: 'music-list',
    component: require('../components/music/music_list.vue'),
  },
  {
    path: '/home/music/list/:listId/song/:songId',
    name: 'music-play',
    component: require('../components/music/music_play.vue'),
  },
  {
    path: '/home/photo/detail/:id',
    name: 'photo-detail',
    component: require('../components/photo/photo_detail.vue'),
  },
  {
    path:'*', redirect: './login'
  }]

});


export default router;