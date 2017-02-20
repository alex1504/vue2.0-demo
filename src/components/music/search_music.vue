<template>
<div id="searchBar">
  <md-theme md-name="teal">
	<md-input-container md-inline>
	    <label><i class="iconfont icon-search"></i>搜索</label>
	    <md-input v-model="searchQuery" @keyup.native="search"></md-input>
  	</md-input-container>
  </md-theme>
</div>
	
</template>
<script>
import axios from "axios"
import Util from "../../util/util.js"
export default {
  data() {
  	return {
  		searchQuery: '',
  	}
  },
  methods: {
    search: Util.debounce(function(){
		    	axios.get(API_PROXY+'http://s.music.163.com/search/get?type=1&s='+this.searchQuery)
				  .then(function(res) {
				  	if(res.data.result && res.data.result.songs){
				  		var playList = res.data.result.songs;
					  	// 为当前playList的每项增加一个playing状态用于指示歌曲是否正在播放
					  	playList.forEach(function(obj){
					  		obj.playing = false;
					  	})
					  	// 提交MUSIC_LISTS_CHANGE的mutation
					  	this.$store.commit('MUSIC_LISTS_CHANGE', {
					  		'activeList': playList,
					  		'activeListId': this.id
					  	});
				    	this.$emit("searchSong", playList);
				  	}
				    if(typeof res.data.result === "undefined")
				    	this.$emit("searchSong", '');
				  }.bind(this))
				  .catch(function (error) {
				    console.log(error);
				  });
    		},500)
  	}
}
</script>
<style lang="scss" scoped>
	#searchBar{
		height:38px;
	}
	.md-input-container{
		margin: 0;
		top: -10px;
		label{
			left: 16px;
		}
		input{
			padding-left: 40px;
		}
	}
	.icon-search{
		position: relative;
		top: -4px;
	}
	
</style>



