<template>
	<div id="regist" @keyup.enter="regist">
		<form novalidate autocomplete="off">
			<p style="margin-bottom:64px;color:#666;">已有账号，直接<a style="color:#f44336;font-size: 16px;" @click="goLogin">登录</a></p>
		  <md-avatar class="md-large">
		    <img src="./img/regist_avatar.jpg" alt="People">
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
		    <md-input :type="isHide ? 'password' : ''" v-model="password" :required='inputFlag'></md-input>
		    <md-icon></md-icon>
		  </md-input-container>
		  <md-button class="md-raised md-warn" md-theme="whiteForm" @click="regist">注册</md-button>
		</form>
		
		<md-dialog-alert
		  :md-content="alert.content"
		  :md-ok-text="alert.ok"
		  @open="onOpen"
		  @close="onClose"
		  ref="check">
		</md-dialog-alert>
		
		<div class="overlay" v-show="registing">
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
			isHide: false,
			tipFlag: false,
			inputFlag: true,
			username: '',
			password: '',
			registing: false                   //注册中
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
		regist(){
			var username = this.username;
			var pass = this.password;
			/*验证用户名和密码是否为空*/
			if(!this.check({
				username: username,
				pass: pass
			})) return;

			this.registing = true

			var user = new AV.User();
		  	user.setUsername(username);
		  	user.setPassword(pass);
		  	user.signUp().then(function (loginedUser) {
		  		this.registing = false;
		  		this.doneRegist();
		  		setTimeout(function(){
			    	this.$router.push({name:'movie'})
			    }.bind(this),600)
		  	}.bind(this), (function (error) {
		  		if(error.code = '202'){
		  			this.alert.content = '用户名已存在';
		  		}else{
		  			this.alert.content = '注册失败，请重试';
		  		}
				this.openDialog('check');
				this.registing = false;
		  	}.bind(this)));
		},
		isEmpty(val){
			return val === '';
		},
		isValidUserName(val){
			return /^[a-zA-Z0-9_]+$/.test(val);
		},
		isValidPassword(val){
			return /^[A-Za-z0-9_-]{4,}$/.test(val);
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
			if(!this.isValidUserName(obj.username)){
				this.alert.content = '用户名不能含有除字母或数字或下划线之外的任何字符';
				this.openDialog('check');
				return false;
			}
			if(!this.isValidPassword(obj.pass)){
				this.alert.content = '密码必须是至少4位的字母或数字结合';
				this.openDialog('check');
				return false;
			}
			return true
		},
		doneRegist(){
			this.alert.content = '注册成功';
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
	    goLogin(){
	    	this.$router.push({name:'login'});
	    }
	}
}
</script>
<style lang="scss" scoped>
#regist{
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
	background: url('./img/regist_bg.jpg') no-repeat center center; 
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