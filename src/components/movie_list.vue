<template>
<div id="movielist">
	<md-layout md-gutter>
	  <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" v-for="movie in movieLists">
	      <md-card>
			  <md-card-media>
			    <img :src="movie.images.large" alt="海报">
			  </md-card-media>

			  <md-card-header>
			    <div class="md-title">{{movie.title}}</div>
			    <div class="md-subhead"><span v-for="genre in movie.genres">{{genre}}/</span><span>({{movie.year}})</span><span>(平均{{movie.rating.average}}分)</span></div>
			  </md-card-header>

			  <md-card-actions>
			    <md-button>详情</md-button>
			  </md-card-actions>
		  </md-card>
	  </md-layout>
	  <md-theme>
	  	<md-spinner :md-size="60" md-indeterminate v-show='true'></md-spinner>
	  </md-theme>
	</md-layout>
</div>
	
</template>
<script>
import axios from "axios"
export default {
  data(){
  	return {
  		spinnerFlag: true,
  		movieLists: []
  	}
  },
  methods: {

  },
  mounted: function(){
  	var start = this.movieLists.length;
  	this.spinnerFlag = true;
  	axios.get(API_PROXY+'https://api.douban.com/v2/movie/top250?count=5&start='+start)
	  .then(function (res) {
	    res.data.subjects.forEach(movie=>{
	    	this.movieLists.push(movie);
	    })
	    this.spinnerFlag = false;
	  }.bind(this))
	  .catch(function (error) {
	    console.log(error);
	  });
  }
}
</script>
<style scoped lang="scss">
#movielist{
	text-align: center;
}
.md-card{
	width: 80%;
	margin: 10px auto;
}
</style>



