<template>
	<div>
		<div class='login-pwd'>
			<div class='form-item-wrapper'>
				<input type="text" placeholder="邮箱/手机号码/小米ID" class='account' v-model="pwdLoginInfo.account">
			</div>
			<div class='form-item-wrapper'>
				<input type="password" placeholder="密码" class='pwd' v-model="pwdLoginInfo.pwd">
			</div>
			<button class='btn-pwd' @click="login">登录</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Cookies from 'js-cookie';

        export default {
                data: function() {
                        return {
                                pwdLoginInfo: {
                                        account: '',
                                        pwd: ''
                                }
                        };
                },
                methods: {
                        login: function() {
                                this.$http({
                                        method: 'post',
                                        url: '/login/pwd',
                                        data: this.pwdLoginInfo
                                })
                                        .then(data => this.$router.replace(Cookies.get('target') || '/'));
                        }
                }
        };
</script>

<style scoped>
	.form-item-wrapper {
		display: flex;
		border-bottom: 1px solid #d3d3d3;
		height: 1.1rem;
	}
	.form-item-wrapper>input {
		flex-grow: 1;
		border: none;
		outline: none;
		font-size: 0.24rem;
	}
	label {
		margin-right: 0.06rem;
		align-self: center;
		font-size: 0.28rem;
		color: rgb(153,153,153);
	}
	button[class^=btn] {
		border-radius: 0.6rem;
		width: 100%;
		height: 0.7rem;
		line-height: 0.7rem;
		text-align: center;
		background-color: #e4bb7e;
		color: #fff;
		border: none;
		outline: none;
		margin: 0.4rem 0;
		box-shadow: 0 0.08rem 0.04rem #f1eadf;
		font-size: 0.28rem;
	}
	button.code {
		font-size: 0.28rem;
		white-space: nowrap;
		border: none;
		outline: none;
		color: rgb(195,156,99);
		background-color: transparent;
	}
	span {
		font-size: 0.24rem;
	}
</style>