import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./types.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loginFlag: false,
		activeRoute: 'movie',
		audioSrc: '',
		music: {
			activeLists: null,
			activeListsId: '',
			playing: false,
			activeSong:{
				activeSrc: '',
				activeIndex: '',
				duration: '',
				avatarUrl:''
			},
			activeTime: '00:00',
			activePercent: '0%'
		}
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
		[types.ROUTE_CHANGE](state,payload){
			state.activeRoute = payload.activeRoute
		},
		[types.LOGIN_CHANGE](state,payload){
			state.loginFlag = payload.loginFlag
		},
		[types.MUSIC_LISTS_CHANGE](state,payload){
			state.music.activeLists = payload.activeLists
			state.music.activeListsId = payload.activeListsId
		},
		[types.MUSIC_SONG_CHANGE](state,payload){
			state.music.activeSong.activeSrc = payload.activeSrc;
			state.music.activeSong.activeIndex = payload.activeIndex;
			state.music.activeSong.duration = payload.duration;
			state.music.activeSong.avatarUrl = payload.avatarUrl;
			state.music.playing = payload.playing;
		},
		[types.PLAY_STATE_CHANGE](state,payload){
			state.music.playing = payload.playing;
		},
		[types.PLAY_TIME_CHANGE](state,payload){
			state.music.activeTime = payload.curTime;
			state.music.activePercent = payload.activePercent;
		},
	}
})

export default store