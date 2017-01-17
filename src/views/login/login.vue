<template>
	<div id="login">
		<form novalidate @submit.stop.prevent="submit">
	      <md-avatar class="md-large">
		    <img src="./img/login_avatar.jpg" alt="People">
		  </md-avatar>
		  <md-input-container md-theme="teal">
		    <md-icon>
		      <i class="iconfont icon-user"></i>
		      <md-tooltip>Be careful. You're almost broken!</md-tooltip>
		    </md-icon>
		    <label></label>
		    <md-input type="text"></md-input>
		    <md-icon></md-icon>
		  </md-input-container>

		  <md-input-container md-theme="teal">
		    <md-icon>
		      <i class="iconfont icon-password"></i>
		      <md-tooltip>Be careful. You're almost broken!</md-tooltip>
		    </md-icon>
		    <label></label>
		    <md-input type="password"></md-input>
		    <md-icon></md-icon>
		  </md-input-container>
		  <md-button class="md-raised md-primary" md-theme="teal" @click>登录</md-button>
		</form>
	</div>
</template>
<script>
export default {
	
}
</script>
<style lang="scss" scoped>
#login{
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
	/* background: url('./img/login_bg.jpg') no-repeat center center; */
	background-size: cover;
	filter: saturate(80%);
	form{
		width: 70%;
	}
}
.md-input{
	color: rgba(0,0,0,.87);
	box-sizing: border-box;
	padding-left: 30px;
}
.md-icon{
	position: absolute;
	left:0
}
.iconfont{
	color:rgba(0,0,0,.54)
}
.md-theme-default.md-input-container.md-input-focused{
	/* .iconfont{
		color: #2196f3;
	} */
	/* .md-input{
		color: rgba(0, 0, 0, 0.87);
	} */
}
.md-avatar.md-large{
	width: 150px;
    min-width: 150px;
    height: 150px;
    min-height: 150px;
    border-radius: 150px;
}

</style>