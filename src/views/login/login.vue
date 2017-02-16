<template>
	<div id="login" @keyup.enter="login">
		<transition name="slideT">
			<div class="login-tip" v-show="tipFlag">
				测试账号：&nbsp&nbsp用户名：test &nbsp&nbsp&nbsp 密码：test
			</div>
		</transition>
		<form novalidate autocomplete="off">
	      <md-avatar class="md-large">
		    <img src="./img/login_avatar.jpg" alt="People">
		  </md-avatar>
		  <md-input-container md-theme="whiteForm">
		    <md-icon>
		      <i class="iconfont icon-user"></i>
		      <md-tooltip>用户名</md-tooltip>
		    </md-icon>
		    <label></label>
		    <md-input type="text" v-model="username" :required='inputFlag'></md-input>
		    <md-icon></md-icon>
		  </md-input-container>

		  <md-input-container md-theme="whiteForm">
		    <md-icon>
		      <i class="iconfont icon-password"></i>
		      <md-tooltip>密码</md-tooltip>
		    </md-icon>
		    <label></label>
		    <md-input type="password" v-model="password" :required='inputFlag'></md-input>
		    <md-icon></md-icon>
		  </md-input-container>
		  <md-button class="md-raised md-accent" md-theme="whiteForm" @click="login">登录</md-button>
		  <md-button class="md-raised md-warn" md-theme="whiteForm" @click="goRegist">注册</md-button>
		</form>

		<md-dialog-alert
		  :md-content="alert.content"
		  :md-ok-text="alert.ok"
		  @open="onOpen"
		  @close="onClose"
		  ref="check">
		</md-dialog-alert>
		
		<div class="overlay" v-show="logging">
			<md-spinner :md-size="150" md-indeterminate class="md-accent" md-theme="whiteForm"></md-spinner>
		</div>
	</div>
</template>
<script>
import AV from "../../assets/js/av"
import Util from "../../util/util"
import "../../assets/js/initLeanCloud"

export default {
	data(){
		return{
			alert:{
				content:' ',
				ok:'返回'
			},
			tipFlag: false,
			inputFlag: true,
			username: '',
			password: '',
			logging: false                   //登录中
		}
	},
	computed:{
		
	},
	mounted(){ 
		this.tipFlag = true;
		setTimeout(function(){
			this.tipFlag = false;
		}.bind(this),4000)
	},
	methods: {
		login(){
			var username = this.username;
			var pass = this.password;
			/*验证用户名和密码是否为空*/
			if(!this.check({
				username: username,
				pass: pass
			})) return;

			this.logging = true

			AV.User.logIn(username, pass).then(function (loginedUser) {
			    setTimeout(function(){
			    	this.$router.push({name:'movie'})
			    }.bind(this),600)
			}.bind(this), function (error) {
			    this.alert.content = '用户名和密码不匹配';
				this.openDialog('check');
				this.logging = false;
			}.bind(this));
		},
		isEmpty(val){
			return val === ''
		},
		check(obj){
			if(this.isEmpty(obj.username)){
				this.alert.content = '用户名不能为空';
				this.openDialog('check');
				return false;
			}
			if(this.isEmpty(obj.pass)){
				this.alert.content = '密码不能为空';
				this.openDialog('check');
				return false;
			}
			return true
		},
		doneLogin(res){
			this.alert.content = res.data.msg;
			this.alert.ok = '';
		    this.openDialog('check');
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
	      console.log('Closed', type);
	    },
	    goRegist(){
	    	this.$router.push({name:'regist'});
	    }
	}
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
	background: url('./img/login_bg.jpg') no-repeat center center; 
	background-size: cover;
	form{
		width: 70%;
	}
}
.md-theme-whiteForm.md-input-container.md-input-focused input{
	text-shadow: 0 0 0 rgba(255,255,255,.87);
}
.md-input{
	color: #fff;
	box-sizing: border-box;
	padding-left: 30px;
}
.md-input:focous{
	color: #fff;
}
.md-icon{
	position: absolute;
	left:0
}
.iconfont{
	color: rgba(255,255,255,.84);
}
.md-input-container input{
	color: rgba(255,255,255,.84);
}
.md-input-container:after{
	background-color:#fff;
}
.md-avatar.md-large{
	width: 150px;
    min-width: 150px;
    height: 150px;
    min-height: 150px;
    border-radius: 150px;
}
.overlay{
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(200,200,200,.6)
}
.md-spinner{
	position: fixed;
}
.login-tip{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 64px;
  line-height: 64px;
  text-align: center;
  background-color: rgba(200,200,200,.8);
  color: #fff;
}
.slideT-enter-active, .slideT-leave-active {
  transition: all .5s
}
.slideT-enter-active{
	transform: translateY(0);
}
.slideT-enter, .slideT-leave-active {
  transform: translateY(-100%);
}
</style>