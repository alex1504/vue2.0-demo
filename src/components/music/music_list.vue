<template>
<div id="music-list">
	<md-theme :md-name="theme">
		<headerBack :title="albumName"></headerBack>
		<backToTop @clickBack="backToTop"></backToTop>
		<search @searchSong="showResults"></search>
		<md-list v-if="flag">
		    <md-list-item v-for="(music, index) of playLists" @click='play(index)'>
		      <md-avatar>
		        <img :src="music.album.picUrl" alt="People">
		      </md-avatar>
		      <span>{{music.name | getShortName}}/{{music.duration | getDuration}}</span>
		      <md-button class="md-icon-button md-list-action">
		      	<md-icon class="md-primary md-theme-teal"><i class="iconfont icon-play"></i></md-icon>
		      </md-button>
		      <div class="progress" :style="{ width: audioProgress}" v-show="progressFlag"></div>
		    </md-list-item>
		   
		</md-list> 
		<md-list v-if="!flag">
		    <md-list-item v-for="(music, index) of searchLists" @click='togglePlay(index)'>
		      <md-avatar>
		        <img :src="music.album.picUrl" alt="People">
		      </md-avatar>
		
		      <span>{{music.name}}</span>
		      <md-button class="md-icon-button md-list-action">
		        <md-icon class="md-primary md-theme-teal"><i class="iconfont icon-play"></i></md-icon>
		      </md-button>
		    </md-list-item>
		</md-list>
	</md-theme> 
</div>
	
</template>
<script>
import Search from "./search_music.vue"
import BackToTop from "../common/backToTop.vue"
import axios from "axios"
import Store from "../../assets/js/storage.js"
import HeaderBack from "../common/header_back.vue"
export default {
  components: {
  	search: Search,
  	backToTop: BackToTop,
  	headerBack: HeaderBack
  },
  data() {
	return {
		id: this.$route.params.id,
		flag: true,
		playLists: [],
		searchLists:[],
		audioProgress: '100%',
		progressFlag: false,
	};
  },
  computed:{
    spinnerClass(){
      return this.$store.getters.SPINNER_CLASS
    },
    theme(){
    	return this.$store.getters.THEME_COLOR
    },
    albumName(){
		var mapAlbum = {
			19723756: "飙升榜",
			3779629: "新歌榜",
			2884035: "原创榜",
			21845217: "KTV麦榜",
			4395559: "华语金曲榜",
			98833242: "我的专辑",
		}
		return mapAlbum[this.id]
    },
    
  },
  mounted:function(){

  	var localList = Store.get('music_list_'+this.$route.params.id);
  	if( typeof localList !== "undefined" ){
  		this.playLists = localList;
  		return;
  	}
  	axios.get(API_PROXY+'http://music.163.com/api/playlist/detail?id='+this.id)
	  .then(function (res) {
	  	console.log(res)	
	  	this.playLists = res.data.result.tracks;
	  	Store.set('music_list_'+this.$route.params.id, res.data.result.tracks);
	  }.bind(this))
	  .catch(function (error) {
	    console.log(error);
	  });
  },
  filters:{
  	getShortName(val){
  		if(String(val.length) > 10)
  			return val.slice(0, 10)+"...";
  		return val;
  	},
  	getDuration(val){
  		var m = Math.floor(val/1000/60).toString();
  		var s = Math.round(val/1000%60).toString();
  		m = (m.length == 1) ? 0+m : m;
  		s = (s.length == 1) ? 0+s : s;
  		return m+":"+s;
  	}
  },
  methods: {
    showResults(songs){
    	if(songs){
    		this.searchLists = songs;
    		this.flag = false
    	}else{
    		this.flag = true
    	}
    },
    showList: function(){
    	this.flag = true
    },
    backToTop(){
    	document.body.scrollTop = 0;
    },
    play(index){
    	this.$store.commit('AUDIO_CHANGE',{audioSrc: this.playLists[index].mp3Url})
    }
    
  }
}
</script>
<style scoped lang="scss">
	#music-list{
		min-height: 100vh;
		box-sizing: border-box;
		padding: 64px 0 0 0;
		text-align: center;
	} 
	.progress{
		position: absolute;
		height: 2px;
		left:0;
		bottom:0px;
		background-color: rgba(0,128,128,.5)
	}
	
</style>



