<template>
	<div id="home">
		<md-theme :md-name="theme">
			<navBar @toggleLeftSidenav="toggleLeftSidenav"></navBar>

			<md-button class="md-icon-button md-raised md-primary arrow-up" @click="backToTop">
			  <i class="iconfont icon-top"></i>
			</md-button>

			<md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
			    <md-toolbar class="md-large">
			      <div class="md-toolbar-container">
			        <h3 class="md-title">Vuejs2.0-demo</h3>
			      </div>
			    </md-toolbar>

			    <p class="soucecode">SourceCodeLink:</p>
			    <p><a href="https://github.com/alex1504/vue2.0-demo">https://github.com/alex1504/vue2.0-demo</a></p>
			</md-sidenav>

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
		}
	},
	computed: {
		theme(){
			var map = {
	  			"movie": 'blue',
	  			"music": 'teal',
	  			"book": 'brown',
	  			'photo': 'indigo'
	  		}
	  		var routeName = this.$route.name;
	  		if(this.$store.state.theme !== map[routeName]){
	  			this.$store.state.theme = map[routeName];
	  		}
	  		return map[routeName]
		}
	},
	mounted: function(){
		this.setActiveTheme();
	},
	methods: {
		setActiveTheme(){
			var map = {
	  			"movie": 'blue',
	  			"music": 'teal',
	  			"book": 'brown',
	  			'photo': 'indigo'
	  		}
	  		var routeName = this.$route.name;
	  		this.$store.state.theme = map[routeName];
		},
		backToTop: function(){
			document.scrollingElement.scrollTop = 0;
		},
		toggleLeftSidenav() {
	      this.$refs.leftSidenav.toggle();
	    },
		open(ref) {
	      console.log('Opened: ' + ref);
	    },
	    close(ref) {
	      console.log('Closed: ' + ref);
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
.soucecode{
	font-size: 16px;
	padding: 20px 0;
}
</style>