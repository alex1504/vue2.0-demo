<template>
<div id="music">
	<audio :src='src' autoplay ref="audio"></audio>
	<md-list>
	    <md-list-item v-for="(music, index) of playLists" data-url="music.mp3Url" @click='togglePlay(index)'>
	      <md-avatar>
	        <img :src="music.album.picUrl" alt="People">
	      </md-avatar>
	
	      <span>{{music.name}}/{{music.duration}}</span>
	
	      <md-button class="md-icon-button md-list-action">
	        <md-icon class="md-primary md-theme-teal" v-text="audioState[index].iconState"></md-icon>
	      </md-button>
	    </md-list-item>
	</md-list> 
	<md-dialog-alert
	  :md-content="alert.content"
	  :md-ok-text="alert.ok"
	  @open="onOpen"
	  @close="onClose"
	  ref="dialog">
	</md-dialog-alert>
	<md-spinner class="md-theme-teal" :md-size="60" md-indeterminate v-show='spinnerFlag'></md-spinner>
</div>
	
</template>
<script>
import axios from "axios"
export default {
  data() {
	return {
		alert: {
	      content: '云音乐资源不稳定，请重试',
	      ok: '好的!'
	    },
		audioState: [],
		src: '',
		spinnerFlag: true,
		playLists: [],
	};
  },
  computed:{

  },
  mounted:function(){
  	axios.get(API_PROXY+'http://music.163.com/api/playlist/detail?id=98833242')
	  .then(function (res) {
	  	console.log(res);
	    res.data.result.tracks.forEach((music,index)=>{
	    	this.playLists.push(music);
	    	this.audioState.push({
	    		paused: true,
	    		index: index,
	    		iconState: 'play_circle_filled' 
	    	});
	    })
	    this.spinnerFlag = false;
	  }.bind(this))
	  .catch(function (error) {
	    console.log(error);
	  });
  },
  methods: {
    togglePlay(index){
    	if(!this.audioState[index].paused){
    		this.audioState[index].paused = true;
    		this.audioState[index].iconState = 'play_circle_filled';
    		this.$refs.audio.pause();
    		return;
    	}
    	this.audioState.forEach(obj=>{
    		obj.paused = true;
    		obj.iconState = 'play_circle_filled';
    	})
    	this.audioState[index].paused = false;
    	this.audioState[index].iconState = 'pause_circle_filled';
    	this.$refs.audio.src = this.playLists[index].mp3Url ;

    	/**
    	 注意try catch无法捕获异步请求的错
    	 this.$refs.audio.play()返回promise对象，因此有then catch方法
    	*/
		this.$refs.audio.play().catch(function(e){
			this.openDialog('dialog')
		});
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
    }
  }
}
</script>
<style scoped lang="scss">
	#music{
		min-height: 100vh;
		box-sizing: border-box;
		padding: 64px 0;
		text-align: center;
	}
	.md-list{
		padding:0
	}
</style>



