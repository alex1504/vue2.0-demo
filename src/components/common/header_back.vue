<template>
<div id="header-back">
	<md-toolbar class="top-nav">
	  <md-button class="md-icon-button">
	  <md-icon><i class="iconfont icon-back" @click="go"></i></md-icon>
	  </md-button>
	  <h2 class="md-title" style="flex: 1" v-text="title"></h2>
	  <md-button class="md-icon-button" :style="{opacity:0}">
	  	<md-icon></md-icon>
	  </md-button>
	</md-toolbar>
</div>
</template>


<script>

export default {
  mounted: function(){
  	
  },
  data() {
	return {

	}
  },
  props:['title'],
  computed: {
  	
  },
  methods: {
   go(){
   	history.go(-1);
   }
    
  }
}
</script>
<style lang="scss" scoped>
	
</style>



