<template>
	<div>
		这是主页
		<!--使用组件-->
		<MiNav></MiNav>
	</div>
</template>
<script>
	import MiNav from '../components/MiNav.vue'; //导入组件

	export default {
	        //注册组件
		components: { MiNav },
	};
</script>
<style scoped>

</style>