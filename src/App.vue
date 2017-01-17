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


      if(!this.checkIsLogined()){
        this.alert.content = '登录过期，请重新登录';
        this.openDialog('check');
        this.redirect();
      }
    }
  },
  mounted: function(){
    this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute})

    window.onload = function(){
      if(!this.checkIsLogined()){
        this.alert.content = '登录过期，请重新登录';
        this.openDialog('check');
        this.redirect();
      }
    }.bind(this)
  },
  methods:{
    checkIsLogined(){
      var loginTime = localStorage.getItem('loginTime')*1;
      var token = localStorage.getItem('token');
      var time = localStorage.getItem('tokenEnabled')*1;
      var now = Date.now();
      if(!loginTime || !token || !time) return false;
      if((loginTime+time) <= now){
        return false
      };
      return true
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
