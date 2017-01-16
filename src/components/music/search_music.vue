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
				  	if(res.data.result && res.data.result.songs)
				    	this.$emit("searchSong", res.data.result.songs);
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

</style>



