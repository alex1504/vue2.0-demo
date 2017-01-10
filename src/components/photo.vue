<template>
<div id="photo">
		<md-layout md-gutter>
      <md-layout md-flex-xsmall="100">
        <div class="content">图片画廊</div>
      </md-layout>
    </md-layout>
    <md-spinner :md-size="60" md-indeterminate></md-spinner>
</div>
	
</template>
<script>
import axios from "axios"
export default {
  components: {
  },
  data() {
	return {

	}
  },
  computed:{

  },
  mounted:function(){
  	
  },
  methods: {
    
  }
}
</script>
<style scoped lang="scss">
	#photo{
		min-height: 100vh;
		box-sizing: border-box;
		padding: 64px 0;
		text-align: center;
	}
  .content{
    margin: 0 auto
  }
</style>



