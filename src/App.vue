<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import home from './views/home/home.vue'
export default {
  name: 'app',
  data(){
    return{
    }
  },
  computed: {
    activeRoute(){
      return this.$route.name
    }
  },
  watch:{
    activeRoute(){
      this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute})
    }
  },
  mounted: function(){
    this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute})
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
