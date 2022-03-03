<template>
	<el-container class="mi-home">
		<el-aside width="auto">
			<HomeNav></HomeNav>
		</el-aside>
		<el-container>
			<el-header>
				<h1>小米后台管理系统</h1>
			</el-header>
			<el-main>
				<HomeTab></HomeTab>
			</el-main>
			<el-footer height="30px">
				<p>&copy;版权所有：熊建宇</p>
				<p>tel：18734994291</p>
				<p>e-mail：1765659645@qq.com</p>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script type="text/ecmascript-6">
	import HomeNav from '../components/HomeNav.vue';
	import HomeTab from '../components/HomeTab.vue';

        export default {
                components: {
                        HomeNav,
                        HomeTab
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.mi-home
		height: 100%
		.el-aside
			background-color: #000
		.el-header
			background-color: #303133
			display: flex
			align-items: center
			h1
				color: #ff7a4d
				font-size: 28px
		.el-footer
			display: flex
			align-items: center
			background-color: #000
			p
				color: #ccc
				font-size: 12px
				font-weight: normal
				margin-right: 50px
</style>