import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const MUTATION_THEME_CHANGE = 'THEME_CHANGE'


const store = new Vuex.Store({
	state: {
		theme: 'blue'
	},
	mutations:{
		[MUTATION_THEME_CHANGE](state,payload){
			console.log(payload.theme);
			state.theme = payload.theme
		}
	}
})

export default store