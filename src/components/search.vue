<template>
<div id="searchBar">
  <md-theme md-name="teal">
	<md-input-container md-inline>
	    <label><md-icon>search</md-icon>搜索</label>
	    <md-input v-model="searchQuery" @keyup.enter.native="search" @keyup.delete.native="deleteHandler"></md-input>
  	</md-input-container>
  </md-theme>
</div>
	
</template>
<script>
import axios from "axios"
export default {
  data() {
  	return {
  		searchQuery: '',
  	}
  },
  methods: {
    search: function(){
    	axios.get(API_PROXY+'http://s.music.163.com/search/get?type=1&s='+this.searchQuery)
		  .then(function(res) {
		    this.$emit("searchSong",res.data.result.songs);
		  }.bind(this))
		  .catch(function (error) {
		    console.log(error);
		  });
    },
    deleteHandler: function(){
    	if(this.searchQuery === ''){
    		this.$emit("showList");
    	}
    }
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



