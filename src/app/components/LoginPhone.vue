<template>
	<div>
		<div class='login-phone'>
			<div class='form-item-wrapper'>
				<label for="">+86&gt;</label>
				<input type="tel" placeholder="手机号码" class='phone' v-model="loginInfo.phone">
			</div>
			<div class='form-item-wrapper'>
				<input type="text" placeholder="短信验证码" class='code2' v-model="loginInfo.code">
				<button class='code' v-text="code" @click="getCode"></button>
			</div>
			<button class='btn-phone' @click="login">立即登录/注册</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import Cookies from 'js-cookie';

        export default {
                        data: function(){
                                return {
                                        loginInfo: { phone: '', code: '' },
                                        code: '获取验证码'
                                };
                        },
                        methods: {
                                getCode: function(){
                                        this.$http({ url: '/login/getcode' })
                                                .then(data => this.code = data)
                                },
                                login: function(){
                                        //客户端进行验证码比对，减少不必要的ajax请求
                                        if(this.code !== this.loginInfo.code.toUpperCase()) {
                                                this.$store.commit('alert/open', '验证码错误...');
                                                return;
                                        }
                                        this.$http({
                                                method: 'post',
                                                url: '/login/phone',
	                                        data: this.loginInfo
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