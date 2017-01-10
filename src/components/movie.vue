<template>
<div id="movie">
	<md-theme md-name="blue">
		<md-tabs md-fixed>
		  <md-tab md-label="top250"><movieListTop250></movieListTop250></md-tab>

		  <md-tab md-label="正在热映"><movieListHot></movieListHot></md-tab>

		  <md-tab md-label="即将上映"><movieListComing></movieListComing></md-tab>

	    </md-tabs>
	</md-theme>
	
</div>
	
</template>

<script>
import movieListTop250 from "./movie_list_top250.vue"
import movieListHot from "./movie_list_hot.vue"
import movieListComing from "./movie_list_coming.vue"
export default {
  data() {
	return {
	};
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
</style>



