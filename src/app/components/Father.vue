<template>
	<div>
		这是父组件
		<Child :a-prop="name" @aaa="aaaHandler">
			<div>默认插槽</div>
			<div slot="a1" slot-scope="{ key1, key2 }">具名插槽1
				<a href="#">
					<span v-text="key1"></span>
					<span v-text="key2"></span>
				</a>
			</div>
			<div slot="a2">具名插槽2</div>
			<div slot="a3">具名插槽3</div>
		</Child>
	</div>
</template>

<script type="text/ecmascript-6">
	import Child from './Child.vue';

        export default {
                components: { Child },
	        data() {
                        return {
                                name: 'aaa'
                        }
	        },
	        methods: {
                        aaaHandler() {
                                console.log('child发射事件，father监听到');
                        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>