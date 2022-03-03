<template>
	<div class="login-wrapper">
		<h1 class='title'>欢迎登陆小米有品</h1>
		<div>
			<LoginPhone v-show="loginType === 1"></LoginPhone>
			<LoginPwd v-show="loginType !== 1"></LoginPwd>
			<span class='title-phone' v-show="loginType !== 1" @click="loginType = 1">手机短信登录注册</span>
			<span class='title-pwd' v-show="loginType === 1" @click="loginType = 0">用户密码登录</span>
		</div>
	</div>
</template>
<script>
	import  LoginPhone from '../components/LoginPhone.vue';
        import  LoginPwd from '../components/LoginPwd.vue';

        export default {
                components: { //局部注册要用的组件对象
                        LoginPhone,
                        LoginPwd
                },
                data: function() {
                        return {
                                loginType: 1 //表示手机登录
                        };
                }
        };
</script>
<style>
	.login-wrapper {
		box-sizing: border-box;
		padding: 1.2rem 0.92rem 0;
		background-image: url(../assets/images/login_bg.png);
		background-size: 100% 100%;
		width: 100%;
		height: 100%;
	}
	h1.title {
		font-weight: normal;
		color: #666;
		text-align: center;
	}
</style>














































<!--<template>-->
	<!--<div class="page-wrapper">-->
		<!--<h1 class='title'>欢迎登陆小米有品</h1>-->
		<!--<div class='login-phone' v-show="loginType === 1">-->
			<!--<div class='form-item-wrapper'>-->
				<!--<label for="">+86&gt;</label>-->
				<!--<input type="tel" placeholder="手机号码" class='phone' v-model="loginInfo.phone">-->
			<!--</div>-->
			<!--<div class='form-item-wrapper'>-->
				<!--<input type="text" placeholder="短信验证码" class='code2' v-model="loginInfo.code">-->
				<!--<button class='code' v-text="code" @click="getCode"></button>-->
			<!--</div>-->
			<!--<button class='btn-phone' @click="logon">立即登录/注册</button>-->
		<!--</div>-->
		<!--<div class='login-pwd' v-show="loginType !== 1">-->
			<!--<div class='form-item-wrapper'>-->
				<!--<input type="text" placeholder="邮箱/手机号码/小米ID" class='account' v-model="pwdLoginInfo.account">-->
			<!--</div>-->
			<!--<div class='form-item-wrapper'>-->
				<!--<input type="password" placeholder="密码" class='pwd' v-model="pwdLoginInfo.pwd">-->
			<!--</div>-->
			<!--<button class='btn-pwd' @click="login">登录</button>-->
		<!--</div>-->
		<!--<span class='title-phone' v-show="loginType !== 1" @click="loginType = 1">手机短信登录注册</span>-->
		<!--<span class='title-pwd' v-show="loginType === 1" @click="loginType = 0">用户密码登录</span>-->
	<!--</div>-->
<!--</template>-->
<!--<script>-->
        <!--import http from '../utils/http.js';-->
        <!--import MiNav from '../components/MiNav.vue';-->
        <!--import Cookies from 'js-cookie';-->

        <!--export default {-->
                <!--components: { MiNav },-->
	        <!--data: function(){-->
		        <!--return {-->
                                <!--loginInfo: { phone: '', code: '' },-->
                                <!--code: '获取验证码',-->
                                <!--pwdLoginInfo: { account: '', pwd: '' },-->
                                <!--loginType: 1 //表示手机登录-->
		        <!--}-->
                <!--},-->
                <!--methods: {-->
                        <!--getCode: function(){-->
                                <!--http({ url: '/login/getcode' })-->
                                        <!--.then(data => this.code = data)-->
                        <!--},-->
                        <!--logon: function(){-->
                                <!--//客户端进行验证码比对，减少不必要的ajax请求-->
                                <!--if(this.code !== this.loginInfo.code.toUpperCase()) {-->
                                        <!--alert('验证码错误。。。');-->
                                        <!--return;-->
                                <!--}-->
                                <!--http({-->
                                        <!--method: 'post',-->
                                        <!--url: '/login/phone',-->
                                        <!--data: this.loginInfo-->
                                <!--})-->
                                        <!--.then(data => window.location.href = Cookies.get('target') || 'category2.html')-->
                        <!--},-->
                        <!--login: function(){-->
                                <!--http({-->
                                        <!--method: 'post',-->
                                        <!--url: '/login/pwd',-->
                                        <!--data: this.pwdLoginInfo-->
                                <!--})-->
                                        <!--.then(data => window.location.href = Cookies.get('target') || 'category2.html')-->
                        <!--}-->
                <!--}-->
        <!--}-->
<!--</script>-->
<!--<style scoped>-->
	<!--.page-wrapper {-->
		<!--box-sizing: border-box;-->
		<!--padding: 60px 46px 0;-->
		<!--background-image: url(../assets/images/login_bg.png);-->
		<!--background-size: 100% 100%;-->
		<!--font-size: 12px;-->
	<!--}-->
	<!--h1.title {-->
		<!--font-weight: normal;-->
		<!--font-size: 24px;-->
		<!--color: #666;-->
		<!--text-align: center;-->
	<!--}-->
	<!--.form-item-wrapper {-->
		<!--display: flex;-->
		<!--border-bottom: 1px solid #d3d3d3;-->
		<!--height: 55px;-->
	<!--}-->
	<!--.form-item-wrapper>input {-->
		<!--flex-grow: 1;-->
		<!--border: none;-->
		<!--outline: none;-->
	<!--}-->
	<!--label {-->
		<!--margin-right: 3px;-->
		<!--align-self: center;-->
		<!--font-size: 14px;-->
		<!--color: rgb(153,153,153);-->
	<!--}-->
	<!--button[class^=btn] {-->
		<!--border-radius: 30px;-->
		<!--width: 100%;-->
		<!--height: 35px;-->
		<!--line-height: 35px;-->
		<!--text-align: center;-->
		<!--background-color: #e4bb7e;-->
		<!--color: #fff;-->
		<!--border: none;-->
		<!--outline: none;-->
		<!--margin: 20px 0;-->
		<!--box-shadow: 0 4px 2px #f1eadf;-->
	<!--}-->
	<!--button.code {-->
		<!--white-space: nowrap;-->
		<!--border: none;-->
		<!--outline: none;-->
		<!--color: rgb(195,156,99);-->
		<!--background-color: transparent;-->
	<!--}-->
	<!--.login-phone { }-->
	<!--.login-pwd {-->

	<!--}-->
	<!--span {-->
		<!--font-size: 12px;-->
	<!--}-->
	<!--span.title-phone {-->
	<!--}-->
	<!--span.title-pwd {-->
	<!--}-->
	<!--/* .overlay {-->
		<!--position: fixed;-->
		<!--left: 0;-->
		<!--top: 0;-->
		<!--width: 100%;-->
		<!--height: 100%;-->
		<!--background-color: rgba(0,0,0,0.3);-->
	<!--} */-->
	<!--/* .overlay:before {-->
		<!--content: '';-->
		<!--position: absolute;-->
		<!--left: 50%;-->
		<!--top: 50%;-->
		<!--transform: translate(-50%,-50%);-->
		<!--width: 32px;-->
		<!--height: 32px;-->
		<!--background-image: url(../images/5-121204193R0-50.gif);-->
	<!--} */-->

<!--</style>-->