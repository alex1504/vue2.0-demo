<template>
<div id="navbar">
	<md-theme :md-name="theme">
		<transition name="slideT">
			<md-toolbar class="top-nav">
			  <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
			  	<md-icon><i class="iconfont icon-menu"></i></md-icon>
			  </md-button>
			  <h2 class="md-title" style="flex: 1" v-text="mapTitle"></h2>
			  <md-button class="md-icon-button">
			  	<md-icon><i class="iconfont icon-tubiao-"></i></md-icon>
			  </md-button>
			</md-toolbar>
		</transition>	
		<transition name="slideD">		
			<md-bottom-bar md-shift class="btm-nav">
			<md-bottom-bar-item @click.native="doAction('blue', 0)" :class="{'md-active': isActive[0]}"><i class="iconfont icon-tubiao- btm-nav-icon"></i>电影</md-bottom-bar-item>
				<md-bottom-bar-item @click.native="doAction('teal', 1)" :class="{'md-active': isActive[1]}"><i class="iconfont icon-music btm-nav-icon"></i>音乐</md-bottom-bar-item>
				<md-bottom-bar-item @click.native="doAction('brown', 2)" :class="{'md-active': isActive[2]}"><i class="iconfont icon-book btm-nav-icon"></i>书籍</md-bottom-bar-item>
				<md-bottom-bar-item @click.native="doAction('indigo', 3)" :class="{'md-active': isActive[3]}"><i class="iconfont icon-photo btm-nav-icon"></i>图片</md-bottom-bar-item>
			</md-bottom-bar>
		</transition>
		
	</md-theme>
</div>
</template>


<script>
import Util from "../../util/util.js"
import { mapMutations } from 'vuex'

export default {
  
  mounted: function(){
  	var scrT = document.body.scrollTop || window.scrollY;
  	window.addEventListener("scroll",Util.debounce(function(){
  		var newScrT = document.body.scrollTop || window.scrollY;
  		if(newScrT > 80 && newScrT > scrT)
  			this.isScrollDown = true;
  		if(newScrT < scrT)
  			this.isScrollDown = false;
  		scrT = newScrT;
  	},300).bind(this));

  	this.setActiveNav();
  },
  data() {
	return {
		title: '',
		isActive: [true,false,false,false],
		isScrollDown: false,
	}
  },
  computed: {
  	theme(){
  		return this.$store.state.theme
  	},
  	mapTitle(){
  		return this.$route.name;
  	}
  },
  methods: {
    /*...mapMutations([
  		setTheme: 'THEME_CHANGE'
  	]),*/
    doAction(theme, index) {
      // this.setTheme(theme);
      this.$store.commit('THEME_CHANGE',{
      	theme: theme,
      	index: index
      });
      this.go(index);
      this.setActiveNav()
    },
    go(index){
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
    },
    toggleLeftSidenav() {
      this.$emit("toggleLeftSidenav");
    },
  
    
  }
}
</script>
<style lang="scss">
	.top-nav{
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

	.slideT-enter-active, .slideT-leave-active {
	  transition: all .5s
	}
	.slideT-enter, .slideT-leave-active {
	  transform: translateY(-100%);
	}
	.slideD-enter-active, .slideD-leave-active {
	  transition: all .5s
	}
	.slideD-enter, .slideD-leave-active {
	  transform: translateY(100%);
	}

	.btm-nav-icon{
	    display: block;
    	margin-top: -26px;	
	}
	.md-bottom-bar.md-shift .md-bottom-bar-item .md-text{
		opacity:1
	}
</style>



