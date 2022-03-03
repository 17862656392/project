<template>
	<div class="mi-alert" v-show="isShow">
		<div class="content">
			<h2>提示</h2>
			<p v-text="message"></p>
			<button @click="close">关闭</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';

	let { mapState, mapMutations } = createNamespacedHelpers('alert');
        export default {
                computed: mapState(['isShow', 'message']),
		methods: mapMutations(['close'])
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.mi-alert
		position: fixed
		left: 0
		top: 0
		width: 100%
		height: 100%
		background-color: rgba(0,0,0,0.7)
		font-size: 0.32rem
		text-align: center
		.content
			position: absolute
			left: 50%
			top: 50%
			transform: translate(-50%,-50%)
			background-color: #fff
			font-size: 0.24rem
			h2
				padding: 0.2rem 1.4rem
				font-weight: normal
				background-color: #0094ff
				color: #fff
			p
				margin: 0.2rem 0
				font-size: 0.32rem
			button
				font-size: 0.32rem
				margin-bottom: 0.2rem
</style>