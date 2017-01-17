<template>
	<div id="login">
		<form novalidate @submit.stop.prevent="submit">
	      <md-avatar class="md-large">
		    <img src="./img/login_avatar.jpg" alt="People">
		  </md-avatar>
		  <md-input-container md-theme="whiteForm">
		    <md-icon>
		      <i class="iconfont icon-user"></i>
		      <md-tooltip>用户名</md-tooltip>
		    </md-icon>
		    <label></label>
		    <md-input type="text" v-model="username" :required='flag'></md-input>
		    <md-icon></md-icon>
		  </md-input-container>

		  <md-input-container md-theme="whiteForm">
		    <md-icon>
		      <i class="iconfont icon-password"></i>
		      <md-tooltip>密码</md-tooltip>
		    </md-icon>
		    <label></label>
		    <md-input type="password" v-model="password" :required='flag'></md-input>
		    <md-icon></md-icon>
		  </md-input-container>
		  <md-button class="md-raised md-accent" md-theme="whiteForm" @click="login">登录</md-button>
		</form>

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
import axios from "axios"
export default {
	data(){
		return{
			alert:{
				content:' ',
				ok:'返回'
			},
			flag: true,
			username: '',
			password: ''
		}
	},
	mounted(){
		var isLogin = this.checkIsLogined();
		if(!isLogin) return;

		setTimeout(function(){
	    	this.$router.push({name:'movie'})
	    }.bind(this),600)
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
			/*请求mock模拟的登录接口*/
			axios.post('/api/login', {
			    username: username,
			    password: pass
			})
			.then(function (res) {
				this.doneLogin(res);
				this.saveToken(res);

			    setTimeout(function(){
			    	this.$router.push({name:'movie'})
			    }.bind(this),600)

			}.bind(this))
			.catch(function (error) {
			    console.log(error);
			});
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
		saveToken(res){
			localStorage.setItem("loginTime", Date.now());
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("tokenEnabled", res.data.time);
		},
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

</style>