<template>
	<div class="num-count">
		<span class="decrease" @click="$emit('decrease')">-</span>
		<span class="count" v-text="count"></span>
		<span class="increase" @click="$emit('increase')">+</span>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: [ 'count' ]
        };
</script>

<style scoped>
	.num-count {
		width: 1.8rem;
		height: 0.4rem;
		display: flex;
		z-index: 1000;
	}
	.num-count>span {
		flex: 0 0 auto;
		width: 0.52rem;
		text-align: center;
		font-weight: bolder;
		color: #666666;
	}
	.num-count>span.count {
		flex-grow: 1;
		background-color: rgb(244,244,244);
	}
</style>