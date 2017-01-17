import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./types.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
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
		}
	}
})

export default store