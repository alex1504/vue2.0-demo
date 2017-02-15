<template>
	<div id="back-to-top" >
		<md-theme :md-name="theme">
			<md-button class="md-icon-button md-raised md-primary arrow-up" @click="backToTop">
			  <i class="iconfont icon-top"></i>
			</md-button>
		</md-theme>
	</div>
</template>
<script>
export default {
	data(){
		return{

		}
	},
	computed:{
		theme(){
	  		return this.$store.getters.THEME_COLOR
	  	},
	},
	methods:{
		backToTop(){
			this.$emit('clickBack');
		}
	}

}
</script>
<style lang="scss" scoped>
.arrow-up{
	position: fixed;
    bottom: 62px;
    left: 0px;
    z-index: 2;
}
</style>