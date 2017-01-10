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
			<md-bottom-bar-item @click.native="doAction('blue', 0)" md-icon="ondemand_video" :class="{'md-active': isActive[0]}">电影</md-bottom-bar-item>
			<md-bottom-bar-item @click.native="doAction('teal', 1)" md-icon="music_note" :class="{'md-active': isActive[1]}">音乐</md-bottom-bar-item>
			<md-bottom-bar-item @click.native="doAction('brown', 2)" md-icon="books" :class="{'md-active': isActive[2]}">书籍</md-bottom-bar-item>
			<md-bottom-bar-item @click.native="doAction('indigo', 3)" md-icon="photo" :class="{'md-active': isActive[3]}">图片</md-bottom-bar-item>
		</md-bottom-bar>
	</md-theme>
</div>
</template>
<script>
export default {
  data() {
	return {
		isActive: [true,false,false,false]
	};
  },
  mounted: function(){
  	this.setActiveNav()
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
  		return map[routeName];
  	},
  },
  methods: {
    doAction(theme, index) {
      this.setTheme(theme);
      this.go(index);
      this.setActiveNav()
    },
    setTheme(theme){
    	this.theme = theme;
    	this.$emit('themeChange', this.theme);
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
        case 2:
        	this.$router.push({name:'book'});
        	break;
        case 3:
        	this.$router.push({name:'photo'});
        	break;
		}
    },
    setActiveNav: function(){
    	/*根据路由显示当前导航按钮*/
	  	var map = {
			"movie": 0,
			"music": 1,
			"book":  2,
			'photo': 3
		}
		var routeName = this.$route.name;
		this.isActive = [false,false,false,false];
		this.isActive[map[routeName]] = true;
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



