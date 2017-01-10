<template>
<div id="movielist-hot" class="wrap-scroll">
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
	  	<md-spinner :md-size="60" md-indeterminate v-show='spinnerFlag'></md-spinner>
	</md-layout>
</div>
	
</template>
<script>
import axios from "axios"
export default {
  data(){
  	return {
  		scrEle: null,
  		eleH: 0,
  		spinnerFlag: true,
  		movieLists: [],
  		busy: false
  	}
  },
  mounted:function(){
  	this.scrEle = document.querySelector(".wrap-scroll");
  	this.eleH = this.scrEle.offsetHeight;
  	this.loadMore();
  	window.addEventListener('scroll', function(e){
  		if(this.isTouchScreenBtm(e)){
  			this.loadMore();
  		}
  	}.bind(this))
  },
  watch: {
  	movieLists: function(){
  		setTimeout(function(){
  			this.eleH = this.scrEle.offsetHeight;
  		}.bind(this),1000)
  	}
  },
  methods: {
  	isTouchScreenBtm: function(e){
  		var winH = window.innerHeight || document.documentElement.clientHeight;
  		var navH = document.querySelector(".top-nav").offsetHeight;
  		var innerWinH = winH - navH * 2;
  		var eleH = this.eleH;
  		var scrT = document.body.scrollTop || document.documentElement.scrollTop;
  		if(scrT >= eleH - innerWinH){
  			return true;
  		}else{
  			return false
  		}
  	},
	loadMore: function() {
	  if(this.busy){
	  	 return;
	  }
      var start = this.movieLists.length;
      this.busy = true;
      this.spinnerFlag = true;
      axios.get(API_PROXY+'https://api.douban.com/v2/movie/in_theaters?count=5&start='+start)
		  .then(function(res) {
		  	console.log(res);
		    res.data.subjects.forEach(movie=>{
		    	this.movieLists.push(movie);
		    })
		    this.busy = false;
	  		this.spinnerFlag = false;
		  }.bind(this))
		  .catch(function (error) {
		    console.log(error);
		  });
	  
    }
  }
}
</script>
<style scoped lang="scss">
#movielist-hot{
	text-align: center;
}
.md-card{
	width: 80%;
	margin: 10px auto;
}
.md-spinner{
	margin: 0 auto;
}
</style>



