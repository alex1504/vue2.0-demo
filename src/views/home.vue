<template>
	<div id="home">
		<navBar></navBar>
		<router-view></router-view>
	</div>
</template>
<script>
import navBar from "../components/navbar.vue"
import search from "../components/search.vue"
import movie from "../components/movie.vue"
import music from "../components/music.vue"
export default {
	components: {
		navBar,
		search,
		movie,
		music,
	}
}
</script>
<style lang="scss">

</style>