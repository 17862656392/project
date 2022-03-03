<template>
	<div>
		这是子组件
		<slot></slot>
		<slot name="a1" :key1="name" :key2="age"></slot>
		<slot name="a2"></slot>
		<slot name="a3"></slot>
		<span v-text="aProp"></span>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                data() {
                        return {
                                name: '张三',
	                        age: 30
                        }
                },
                props: ['aProp'],
	        created() {
                        this.$emit('aaa')
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>