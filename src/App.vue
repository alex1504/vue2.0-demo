<template>
  <div id="app">
    <audio :src="audioSrc" id="music" autoplay></audio>
    <router-view></router-view>
    <md-dialog-alert
      :md-content="alert.content"
      :md-ok-text="alert.ok"
      @open="onOpen"
      @close="onClose"
      ref="check">
    </md-dialog-alert>
  </div>
</template>

<script>
import Vue from 'vue'
import home from './views/home/home.vue'
import Util from './util/util'
import Store from './assets/js/storage.js'
export default {
  name: 'app',
  data(){
    return{
      alert:{
        content:' ',
        ok:'ok',
      },
    }
  },
  computed: {
    activeRoute(){
      return this.$route.name
    },
    audioSrc(){
      return this.$store.state.music.activeSong.activeSrc
    },
    audioDuration(){
      return this.$store.state.music.activeSong.duration
    },
    playing(){
      return this.$store.state.music.playing
    },

  },
  watch:{
    activeRoute(){
      this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute});
      this.checkLogin();
    },
    playing(val){
      if(val){
        document.getElementById("music").play()
      }else{
        document.getElementById("music").pause()
      }
    }
  },
  mounted: function(){
    var that = this;

    // 测试localStorage是否可用
    this.checkLocalStorageEnabled();

    // 刷新进行路由检测跳转
    this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute})

    // 验证是否登录
    window.onload = function(){
      this.checkLogin();
    }.bind(this)

    // 监听audio播放时间
    document.getElementById("music").addEventListener("timeupdate", function(){
      var curTime = this.currentTime;
      that.$store.commit("PLAY_TIME_CHANGE",{
        curTime: that.formatTime(curTime),
        activePercent: that.getPercent(curTime)
      }) 
    })

  },
  methods:{
    checkLocalStorageEnabled(){
      if (!Store.enabled) {
        alert('您的浏览器不支持localStorage，可能会影响体验')
      }
    },
    checkLogin(){
      if(Util.isCurrentUser()){
        console.log("处于登录状态");
        if(this.$route.name === 'login') this.$router.push({name:'movie'});
      }else{
        console.log(this.$router.name);
        if(this.$route.name === 'regist') return;
        this.$router.push({name:'login'});
      }
    },
    redirect(){
        setTimeout(function(){
            this.$router.push({name:'login'})
        }.bind(this),5000)
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
      this.$router.push({name:'login'})
    },
    play(){
      this.audioEle.play()
    },
    pause(){
      this.audioEle.pause()
    },
    formatTime(val){
      var m = Math.floor(val/60).toString();
      var s = Math.round(val%60).toString();
      m = (m.length == 1) ? 0+m : m;
      s = (s.length == 1) ? 0+s : s;
      return m+":"+s;
    },
    getPercent(curTime){
      return ((curTime / (this.audioDuration/1000)).toFixed(2)) * 100 +'%'
    }
  },
  components: {
    home
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
