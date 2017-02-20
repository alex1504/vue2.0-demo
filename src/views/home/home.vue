<template>
	<div id="home">
		<!-- <audio :src="audioSrc" id="audio"></audio> -->
		<md-theme :md-name="theme">
			<navBar @toggleLeftSidenav="toggleLeftSidenav"></navBar>
			<md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
			    <md-toolbar class="md-large">
			      <div class="md-toolbar-container">
			        <h3 class="md-title">Vuejs2.0-demo</h3>
			      </div>
			    </md-toolbar>
			    <p class="soucecode">SouceCode:</p>
			    <p><a href="https://github.com/alex1504/vue2.0-demo">https://github.com/alex1504/vue2.0-demo</a></p>
			</md-sidenav>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</md-theme>
	</div>
</template>
<script>
import navBar from "../../components/common/navbar.vue"
import movie from "../../components/movie/movie.vue"
import music from "../../components/music/music.vue"
export default {
	data(){
		return{
			
		}
	},
	mounted(){
	},
	computed: {
		theme(){
			return this.$store.getters.THEME_COLOR
		},
	},
	methods: {
		toggleLeftSidenav() {
	      this.$refs.leftSidenav.toggle();
	    },
		open(ref) {
	      console.log('Opened: ' + ref);
	    },
	    close(ref) {
	      console.log('Closed: ' + ref);
	    },
	    
	},
	components: {
		navBar,
		movie,
		music,
	}
}
</script>
<style lang="scss" scoped>
.soucecode{
	font-size: 16px;
	padding: 20px 0;
}
a:not(.md-button):not(.md-bottom-bar-item){
	text-decoration: underline;
}
.md-theme-blue a:not(.md-button), .md-theme-blue .soucecode{
    color: #2196f3
}
.md-theme-teal a:not(.md-button), .md-theme-teal .soucecode{
    color: #009688
}
.md-theme-brown a:not(.md-button), .md-theme-brown .soucecode{
    color: #795548
}
.md-theme-indigo a:not(.md-button), .md-theme-indigo .soucecode{
    color: #3f51b5
}
</style>