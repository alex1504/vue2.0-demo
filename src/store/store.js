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
			activeList: null,
			activeListId: '',
			playing: false,
			activeSong:{
				id: '',
				activeSrc: '',
				activeIndex: '',
				duration: '',
				avatarUrl:'',
				/*lyricData格式:{
					lineIndex: -1,    // lineIndex为高亮句的索引
					lineArr:[ 
						{
							time: '',
							lyric: ''
						}
					] 
				}*/
				lyricData: {
					index: 0,
					lineIndex: -1,
					lineArr: [{
						time: '',
						lyric: '歌词加载中...'
					}]
				}
			},
			activeTime: '00:00',
			activePercent: '0%',
			endNum: 0
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
		// 当前音乐列表变化
		[types.MUSIC_LISTS_CHANGE](state,payload){
			state.music.activeList = payload.activeList
			state.music.activeListId = payload.activeListId
		},
		// 当前歌曲改变
		[types.MUSIC_SONG_CHANGE](state,payload){
			state.music.activeSong.activeSrc = payload.activeSrc;
			state.music.activeSong.activeIndex = payload.activeIndex;

			// 重置歌曲列表播放状态为false，设置当前播放歌曲播放状态为true
			if(state.music.activeList){
				state.music.activeList.forEach(function(obj){
					obj.playing = false;
				})
				state.music.activeList[payload.activeIndex].playing = true;
			}
			state.music.activeSong.duration = payload.duration;
			state.music.activeSong.avatarUrl = payload.avatarUrl;
			state.music.activeSong.id = payload.id;
		},
		// 音乐播放状态改变
		[types.PLAY_STATE_CHANGE](state,payload){
			state.music.playing = payload.playing;
		},
		// 音乐currentTime变化
		[types.PLAY_TIME_CHANGE](state,payload){
			state.music.activeTime = payload.curTime;
			state.music.activePercent = payload.activePercent;
		},
		// 音乐时长变化
		[types.DURATION_CHANGE](state,payload){
			state.music.activeSong.duration = payload.duration;
		},
		// 歌曲结束标识变化
		[types.PLAY_END_NUM_CHANGE](state,payload){
			state.music.endNum = payload.endNum;
		},
		// 歌词数据变化
		[types.LYRIC_DATA_CHANGE](state,payload){
			state.music.activeSong.lyricData.lineArr = payload.lyricData;
		},
		// 高亮行数变化
		[types.LYRIC_DATA_LINEINDEX_CHANGE](state,payload){
			state.music.activeSong.lyricData.lineIndex = payload.lineIndex;
		},
		// LYRIC_DATA指针变化
		[types.LYRIC_DATA_INDEX_CHANGE](state,payload){
			state.music.activeSong.lyricData.index = payload.index;
		},
	}
})

export default store