<template>
	<div>商品详情
		<a @click.prevent="$router.back()">后退</a>
		<div class="banner" ref="banner">
			<ul>
				<li style="background-color: aqua;">第一页</li>
				<li style="background-color: aquamarine;">第二页</li>
				<li style="background-color: antiquewhite;">第三页</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';

        export default {
                mounted() {
                        imagesLoaded(this.$refs.banner, () => {
                                this.$nextTick(() => {
                                        if(!this.bannerScroll) {
                                                this.bannerScroll = new BScroll(this.$refs.banner, {
                                                        scrollX: true,
                                                        scrollY: false,
                                                        momentum: false,   // 关闭batter-scroll的惯性滚动
                                                        snap: {
                                                                loop: true, // 无缝滚动
                                                                threshold: 0.2  // 触发滚动的临界值
                                                        }
                                                });
                                                this.bannerScroll.on('scrollStart', () => clearTimeout(this.timer));
                                                this.bannerScroll.on('scrollEnd', () => this.timer = setTimeout(() => this.bannerScroll.next(), 3000));
                                                this.timer = setTimeout(() => this.bannerScroll.next(), 3000);
                                        }
                                })
                        })


                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.banner
		width: 100%
		overflow: hidden
		ul
			width: 500%
			height: 300px
			li
				width: 20%
				height: 300px
				float: left

</style>