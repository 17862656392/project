<template>
	<div>
		这是主页
		<CountDown :end-date="new Date(2019,6,6,0,0,0)"></CountDown>
		<!--使用组件-->
		<MiNav></MiNav>
	</div>
</template>
<script>
        import MiNav from '../components/MiNav.vue'; //导入组件
        	import CountDown from '../components/CountDown.vue';

        export default {
                //注册组件
		components: { MiNav, CountDown },
        };
</script>
<style scoped>

</style>