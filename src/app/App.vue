<template>
	<div class="root">
		<MiAlert></MiAlert>
		<keep-alive>
			<!--要渲染的组件占位符-->
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>
<script>
	import MiAlert from './components/MiAlert.vue';

	//导出根组件
	export default {
	        components: { MiAlert }
	};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.root
		width: 100%
		height: 100%
</style>
