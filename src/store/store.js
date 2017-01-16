import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./types.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		theme: 'blue',
	},
	getters: {
		
	},
	mutations:{
		[types.THEME_CHANGE](state,payload){
			state.theme = payload.theme
		}
	}
})

export default store