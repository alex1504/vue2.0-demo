import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./types.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loginFlag: false,
		activeRoute: 'movie',
		audioSrc: ''
	},
	getters: {
		[types.THEME](state){
			var mapTheme = {
	  			"movie": 'blue',
	  			'movie-detail': 'blue',
	  			"music": 'teal',
	  			"music-list": 'teal',
	  			"music-play": 'teal',
	  			"book": 'brown',
	  			'photo': 'indigo',
	  			'photo-detail': 'indigo'
	  		}
			return mapTheme[state.activeRoute]
		},
		[types.SPINNERCLASS](state,getters){
			return "md-theme-"+getters[[types.THEME]]
		}
	},
	mutations:{
		[types.AUDIO_CHANGE](state,payload){
			state.audioSrc = payload.audioSrc
		},
		[types.ROUTE_CHANGE](state,payload){
			state.activeRoute = payload.activeRoute
		},
		[types.LOGIN_CHANGE](state,payload){
			state.loginFlag = payload.loginFlag
		}
	}
})

export default store