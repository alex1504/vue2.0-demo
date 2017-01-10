<template>
	<div id="home">
		<md-theme md-name="theme">
			<navBar @themeChange="changeTheme"></navBar>
			<md-button class="md-icon-button md-raised md-primary arrow-up" @click="backToTop">
			  <md-icon>keyboard_arrow_up</md-icon>
			</md-button>
			<router-view></router-view>
		</md-theme>
	</div>
</template>
<script>
import navBar from "../components/navbar.vue"
import search from "../components/search.vue"
import movie from "../components/movie.vue"
import music from "../components/music.vue"
export default {
	data(){
		return{
			theme: 'blue'
		}
	},
	mounted: function(){

	},
	methods: {
		backToTop: function(){
			document.body.scrollTop = 0;
		},
		changeTheme: function(theme){
			this.theme = theme;
		}
	},
	components: {
		navBar,
		search,
		movie,
		music,
	}
}
</script>
<style lang="scss">
.arrow-up{
	position: fixed;
    bottom: 62px;
    left: 0px;
    z-index: 2;
}
</style>