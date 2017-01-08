<template>
<div id="navbar">
	<md-theme :md-name="theme">
		<md-toolbar class="top-nav">
		  <md-button class="md-icon-button">
		    <md-icon>menu</md-icon>
		  </md-button>
		  <h2 class="md-title" style="flex: 1">Vuejs Demo</h2>

		  <md-button class="md-icon-button">
		    <md-icon>favorite</md-icon>
		  </md-button>
		</md-toolbar>

	
		<md-bottom-bar md-shift class="btm-nav">
		<md-bottom-bar-item @click.native="doAction('blue', 0)" md-icon="ondemand_video" md-active>电影</md-bottom-bar-item>
			<md-bottom-bar-item @click.native="doAction('teal', 1)" md-icon="music_note">音乐</md-bottom-bar-item>
			<md-bottom-bar-item @click.native="doAction('brown', 2)" md-icon="books">书籍</md-bottom-bar-item>
			<md-bottom-bar-item @click.native="doAction('indigo', 3)" md-icon="photo">图片</md-bottom-bar-item>
		</md-bottom-bar>
	</md-theme>
</div>
</template>
<script>
export default {
  data() {
	return {
	   theme: 'blue'
	};
  },
  methods: {
    doAction(theme, index) {
      this.setTheme(theme);
      this.go(index);
    },
    setTheme(theme){
    	this.theme = theme;
    },
    go(index){
    	console.log(this.theme)
    	switch(index) {
	    case 0:
	        this.$router.push({name:'movie'});
	        break;
        case 1:
        	this.$router.push({name:'music'});
        	break;
		}
    }
  }
}
</script>
<style lang="scss">
	#navbar{
		position: fixed;
		left:0;
		top:0;
		width:100%;
		z-index: 3;
		color:#fff;
	}
	.md-bottom-bar{
		position: fixed;
		bottom:0;
		left:0;
		z-index: 3
	}
</style>



