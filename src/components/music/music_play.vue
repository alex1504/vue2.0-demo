<template>
<div id="music-play">
	<md-theme :md-name="theme">
		<headerBack :title="songName"></headerBack>
	</md-theme> 
	<div class="container-wrap">
		<div class="container">
			<div class="img-wrap">
				<img src="./img/chinese_music.jpg">
			</div>
			<div class="main">
				<h2>title</h2>
				<p>author</p>
				<div class="progress-wrap">
					<div class="time play">2:09</div>
					<div class="progress-bg">
						<div class="progress">
							<div class="progress-bar"></div>
						</div>
					</div>
					<div class="time total">2:05</div>
				</div>
				<div class="panel">
					<i class="btn prev">a</i>
					<i class="btn play">b</i>
					<i class="btn next">c</i>
				</div>
			</div>
		</div>
	</div>
</div>
	
</template>
<script>
import Search from "./search_music.vue"
import BackToTop from "../common/backToTop.vue"
import axios from "axios"
import Store from "../../assets/js/storage.js"
import HeaderBack from "../common/header_back.vue"
export default {
  components: {
  	search: Search,
  	backToTop: BackToTop,
  	headerBack: HeaderBack
  },
  data() {
	return {
		id: this.$route.params.id,
		flag: true,
		playLists: [],
		searchLists:[],
		audioProgress: '100%',
		progressFlag: false,
		songName: "歌曲名字"
	};
  },
  computed:{
    theme(){
    	return this.$store.getters.THEME_COLOR
    },
  },
  mounted:function(){

  },
  filters:{
  	
  },
  methods: {
   
  }
}
</script>
<style scoped lang="scss">
	#music-play{
		min-height: 100vh;
		box-sizing: border-box;
		padding: 64px 0 0 0;
		text-align: center;
	} 
	.container-wrap{
		height: 100vh;
		box-sizing: border-box;
		padding-top: 64px;
		margin-top: -64px;
		display: flex;
		align-items: center;
		justify-content:center;
	}
	.container{
		width: 90%;
		height: 95%;
		border: 1px solid #aaa;
		.img-wrap{
			height: 60%;
			img{
				width: 100%;
				height: 100%;
			}
		}	
		.main{
			height:40%;
			box-sizing: border-box;
			padding: 20px;
		
		}
	}
	
	.progress-wrap{
		display: flex;
		align-items: center;
		.time{
			flex: 1
		}
		.progress-bg{
			height: 4px;
			background-color: teal;
			flex: 4
		}
	}
	.panel{
		display: flex;
		align-items: center;
		.prev,.next{
			flex: 4;
		}
		.play{
			flex: 2;
		}
	}
</style>



