<template>
<div id="movielist-comming" class="j-container">
   <div class="j-content">
    <md-list class="custom-list md-triple-line">
        <md-list-item v-for="movie in movieLists" @click="getMovieDetail(movie.id)">
            <md-avatar>
              <img :src="movie.images.large" alt="People">
            </md-avatar>
    
            <div class="md-list-text-container">
              <span>{{movie.title}}</span>
              <p><span v-for="genre in movie.genres">{{genre}}</span>({{movie.year}})(平均{{movie.rating.average}}分)</p>
            </div>
    
            <md-button class="md-icon-button md-list-action">
              <md-icon class="md-primary"><i class="iconfont icon-chakan"></i></md-icon>
            </md-button>
    
            <md-divider class="md-inset"></md-divider>
        </md-list-item>
    </md-list>
    <md-spinner :class="spinnerClass" :md-size="60" md-indeterminate v-show='spinnerFlag'></md-spinner>
  </div> 
</div>
	
</template>
<script>
import axios from "axios"
export default {
  data(){
    return {
      scrContainer: null,
      scrContent: null,
      eleH: 0,
      spinnerFlag: true,
      movieLists: [],
      busy: false
    }
  },
  computed:{
    spinnerClass(){
      return this.$store.getters.SPINNER_CLASS
    }
  },
  mounted:function(){
    this.scrContainer = this.$el;
    this.scrContent = this.$el.querySelector(".j-content")
    this.eleH = this.scrContent.offsetHeight;
    this.loadMore();
    this.scrContainer.addEventListener('scroll', function(e){
      if(this.isTouchScreenBtm(e)){
        this.loadMore();
      }
    }.bind(this))
  },
  watch: {
    movieLists: function(){
      setTimeout(function(){
        this.eleH = this.scrContent.offsetHeight;
      }.bind(this),1000)
    }
  },
  methods: {
    getMovieDetail(id){
      this.$router.push({ name: 'movie-detail', params: { id: id }})
    },
    isTouchScreenBtm: function(e){
      var winH = window.innerHeight || document.documentElement.clientHeight;
      var navH = document.querySelector(".top-nav").offsetHeight * 2;
      var innerWinH = winH - navH + 168;
      var eleH = this.eleH;
      var scrT = this.scrContainer.scrollTop;
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
        axios.get(API_PROXY+'https://api.douban.com/v2/movie/coming_soon?count=10&start='+start)
  		  .then(function(res) {
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
.j-container{
  text-align: center;
  height: 77vh;
  overflow-y: scroll
}
.j-content{
  height: auto;
}


</style>



