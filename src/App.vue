<template>
  <div id="app">
    <audio :src="audioSrc" id="music" ref="music"></audio>
    <router-view></router-view>
    <md-dialog-alert
      :md-content="alert.content"
      :md-ok-text="alert.ok"
      @open="onOpen"
      @close="onClose"
      ref="info">
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
        content:'音乐资源不稳定,将在3秒之后为您自动播放下一首',
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
    activeSong(){
      return this.$store.state.music.activeSong
    },
    audioDuration(){
      var that = this;
      var duration = this.activeSong.duration;
      if(typeof duration !== "undefined"){
        return duration;
      }
      // 当duration字段不存在，监听loadedmetadata获取duration,乘1000转化成毫秒
      this.$refs.music.addEventListener("canplay",function(){
        var duration = this.duration * 1000;
        that.$store.commit('DURATION_CHANGE',{
          duration: duration,
        })
        return duration;
      })
    },
    playing(){
      return this.$store.state.music.playing
    },
    lyricData(){
      return this.$store.state.music.activeSong.lyricData.lineArr
    },
    lyricDataIndex(){
      return this.$store.state.music.activeSong.lyricData.index
    }

  },
  watch:{
    activeRoute(){
      this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute});
      this.checkLogin();
    },
    playing(val){
      if(val){
        this.$refs.music.play()
      } else{
        this.$refs.music.pause()
      }
    },
    lyricData(){
      // 这里在src变化并且audio的播放地址变化之后才执行播放，否则会执行两次
      var preSrc = this.$refs.music.getAttribute('src');
      var newSrc = this.activeSong.activeSrc;
      if(preSrc !== newSrc){
        console.log("组织了")
        return;
      }
      console.log(preSrc+"!!!!!"+newSrc);
      this.$refs.music.play().catch(function(e){
        this.openDialog('info');
      }.bind(this))
    }
  
  },
  mounted: function(){

    // 测试localStorage是否可用
    this.checkLocalStorageEnabled();

    // 刷新进行路由检测跳转 
    this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute})

    // 验证是否登录
    window.onload = function(){
      this.checkLogin();
    }.bind(this)
    
    // 监听audio播放时间
    this.$refs.music.addEventListener("timeupdate", function(e){
      var curTime = e.target.currentTime;
      var point;

      // 如果歌词数据存在
      if(this.lyricData[this.lyricDataIndex]){

        point = parseFloat(this.lyricData[this.lyricDataIndex].time);

        if(curTime >= point){
          this.$store.commit("LYRIC_DATA_LINEINDEX_CHANGE",{
            'lineIndex': this.lyricDataIndex
          }) 
          this.$store.commit("LYRIC_DATA_INDEX_CHANGE",{
            'index': ++this.lyricDataIndex
          }) 
        }
      }
     
      this.$store.commit("PLAY_TIME_CHANGE",{
        curTime: this.formatTime(curTime),
        activePercent: this.getPercent(curTime)
      }) 
    }.bind(this))

      // 监听audio播放完毕事件(生成一个八位随机数提交)
      this.$refs.music.addEventListener("ended", function(e){
      this.$store.commit("PLAY_END_NUM_CHANGE",{
        'endNum': parseInt(Math.random()*10000000)
      }) 
    }.bind(this))
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
      // 当资源请求出错，3秒后自动播放下一首
      setTimeout(function(){
        this.closeDialog('info');
        this.$store.commit("PLAY_END_NUM_CHANGE",{
          'endNum': parseInt(Math.random()*10000000)
        }) 
      }.bind(this),3000)
    },
    onClose(type) {
      console.log('Closed');
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
