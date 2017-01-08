<template>
<div id="movie">
	<movieList></movieList>
</div>
	
</template>

<script>
import movieList from "./movie_list.vue"
export default {
  data() {
	return {
	};
  },
  methods: {
    
  },
  components:{
  	movieList
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



