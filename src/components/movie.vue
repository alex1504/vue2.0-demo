<template>
<div id="movie">
	<md-theme md-name="blue">
		<md-tabs md-fixed :class="{'wrap-fixed': isScrollDown}">
		  <md-tab md-label="top250"><movieListTop250></movieListTop250></md-tab>
		  <md-tab md-label="正在热映"><movieListHot></movieListHot></md-tab>
		  <md-tab md-label="即将上映"><movieListComing></movieListComing></md-tab>
	    </md-tabs>
	</md-theme>
	
</div>
	
</template>

<script>
import Util from "../util/util.js"
import movieListTop250 from "./movie_list_top250.vue"
import movieListHot from "./movie_list_hot.vue"
import movieListComing from "./movie_list_coming.vue"
export default {
  data() {
	return {
		isScrollDown: false
	};
  },
  mounted: function(){
  	var scrT = document.body.scrollTop || window.scrollY;
  	/*window.addEventListener("scroll",Util.debounce(function(){
  		var newScrT = document.body.scrollTop || window.scrollY;
  		if(newScrT > 80 && newScrT > scrT)
  			this.isScrollDown = true;
  		else 
  			this.isScrollDown = false;
  	},200).bind(this));*/
  },
  methods: {
    switchMovie(index){
    	console.log(1)
    }
  },
  components:{
  	movieListTop250,
  	movieListHot,
  	movieListComing,
  }
}
</script>
<style lang="scss">
	#movie{
		min-height: 100vh;
		box-sizing: border-box;
		padding: 64px 0;
	}
	.md-tabs{
		position: fixed;
		width:100%;
		top: 64px;
		left:0;
	}
	.md-tabs.wrap-fixed>.md-tabs-navigation{
		position: fixed;
		left:0;
		top: 0;
		width: 100%;
	}
</style>



