<template>
<div id="movie">
	<backToTop @clickBack="backToTop"></backToTop>
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
import Util from "../../util/util.js"
import movieListTop250 from "./movie_list_top250.vue"
import movieListHot from "./movie_list_hot.vue"
import movieListComing from "./movie_list_coming.vue"
import backToTop from "../common/backToTop.vue"
export default {
  data() {
	return {
		isScrollDown: false
	};
  },
  mounted: function(){
 
  },
  methods: {
    switchMovie(index){
    	console.log(1)
    },
    backToTop(){
    	this.$el.querySelector(".j-container").scrollTop = 0;
    }

  },
  components:{
  	movieListTop250,
  	movieListHot,
  	movieListComing,
  	backToTop
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



