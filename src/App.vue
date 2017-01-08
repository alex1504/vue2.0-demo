<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import home from './views/home.vue'
export default {
  name: 'app',
  data(){
    return{
    }
  },
  methods:{

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
