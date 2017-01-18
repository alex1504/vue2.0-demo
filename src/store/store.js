import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./types.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loginFlag: false,
		activeRoute: 'movie'
	},
	getters: {
		theme(state){
			var mapTheme = {
	  			"movie": 'blue',
	  			"music": 'teal',
	  			"book": 'brown',
	  			'photo': 'indigo'
	  		}
			return mapTheme[state.activeRoute]
		}
	},
	mutations:{
		[types.THEME_CHANGE](state,payload){
			state.theme = payload.theme
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