<template>
  <div id="app">
    <audio :src="audioSrc" id="audio"></audio>
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
      audioEle: document.querySelector("#audio")
    }
  },
  computed: {
    activeRoute(){
      return this.$route.name
    },
    audioSrc(){
      return this.$store.state.audioSrc
    }
  },
  watch:{
    activeRoute(){
      this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute});
      this.checkLogin();
    },
    audioSrc(){
      console.log(this.audioEle)
    }
  },
  mounted: function(){
    this.checkLocalStorageEnabled();
    this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute})
    window.onload = function(){
      this.checkLogin();
    }.bind(this)
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
