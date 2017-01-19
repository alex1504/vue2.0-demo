<template>
  <div id="app">
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
export default {
  name: 'app',
  data(){
    return{
      alert:{
        content:' ',
        ok:'ok'
      },
    }
  },
  computed: {
    activeRoute(){
      return this.$route.name
    }
  },
  watch:{
    activeRoute(){
      this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute});
      this.checkLogin();
    }
  },
  mounted: function(){
    this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute})
    /*window.onload = function(){*/
      this.checkLogin();
    /*}.bind(this)*/
  },
  methods:{
    checkLogin(){
      if(Util.isCurrentUser()){
        console.log("处于登录状态");
        if(this.$route.name === 'login') this.$router.push({name:'movie'});
      }else{
        console.log("未登录");
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
