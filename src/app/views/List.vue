<template>
	<div class="page-wrapper">
		<div class="header">
			<div class="header-top">
				<router-link to="/category">&lt;</router-link>
				<h1 class="title" v-text="title"></h1>
			</div>
			<div class="header-nav" ref="nav">
				<ul>
					<li v-for="item in navList" :key="item.id">
						<router-link :to="`/list/${ mainId }/${ item.id}`" replace v-text="item.name"></router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="content" ref="content">
			<div>
				<ul class="clearfix" v-if="$store.state.product.list.length > 0">
					<li v-for="item in $store.state.product.list" :key="item.id">
						<router-link to="/detail">
							<div class="avatar-wrapper">
								<img :src="item.avatar" />
							</div>
							<p class="ellipsis" v-text="item.remark"></p>
							<h3 class="ellipsis" v-text="item.name"></h3>
							<span v-text="`￥${ item.price }`"></span>
						</router-link>
					</li>
				</ul>
				<p v-else>暂无商品，敬请期待</p>
				<p v-show="isLoading">loading...</p>
				<p v-show="$store.state.product.list.length > 0 && !hasMore">已到达底部...</p>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
        import BScroll from 'better-scroll';
        import imagesLoaded from 'imagesloaded';

        export default {
                data: function(){
                        return {
                                mainId: 0,
                                subId: 0,
	                        scrollY: 0,
                                isLoading: false,
                                hasMore: true
                        };
                },
                computed: {
                        title() {
                                return this.mainId ? this.$store.state.category.mainList.find(item => item.id === this.mainId).name : '';
                        },
                        navList() {
                                return this.mainId ? this.$store.state.category.subLists[this.mainId] : [];
                        }
                },
	        watch: {
		        subId(newValue, oldValue) {
		               this.hasMore = true;
		               this._getData(false);
		       },
		        isLoading(newValue, oldValue) {
                                //isloading从 true-> false 变化一次，就说明完成了一次ajax请求
                                if((!newValue) && this.hasMore && this.scroll) this.scroll.finishPullUp();
		        }
	       },
                methods: {
                        _getData(loadMore) {
                                this.isLoading = true;
                                this.$store.dispatch('product/getData', {
                                        subId: this.subId,
                                        loadMore
                                }).then((flag) => {
                                        this.isLoading = false;
	                                this.hasMore = flag;
                                });
                        },
                        _initAndRefreshNavScroll() {
                                let ul = this.$refs.nav.querySelector('ul');
                                let lis = ul.querySelectorAll('li');
                                let lastLi = lis[lis.length - 1];
                                let width = lastLi.offsetLeft + lastLi.clientWidth;
                                ul.style.width = width + 'px';

                                this.$nextTick(() => {
                                        let target = ul.querySelector('.active');
                                        if(!this.navScroll) {
                                                this.navScroll = new BScroll(this.$refs.nav, {
                                                        scrollY: false,
                                                        scrollX: true,
                                                        click: true
                                                });
                                                this.navScroll.scrollToElement(target, 600);
                                        } else {
                                                this.navScroll.refresh();
                                                this.navScroll.scrollToElement(target, 600);
                                        }
                                });
                        },
                        _initAndRefreshContentScroll() {
                                imagesLoaded(this.$refs.content, () => {
                                        this.$nextTick(() => {
                                                if(!this.scroll) {
                                                        this.scroll = new BScroll(this.$refs.content, {
                                                                click: true,
                                                                pullUpLoad: { threshold: -50 } //触发pullingUp事件的临界距离
                                                        });
                                                        this.scroll.on('pullingUp', () => this._getData(true));
                                                }
                                                else this.scroll.refresh();
                                        });
                                });
                        }
                },
                activated() {
                        if(this.$store.state.category.mainList < 1) { //如果用户在当前页面点击刷新，跳回分类页面（单页面最怕用户刷新）
				this.$router.replace('/category');
				return;
                        }
                        if(this.scroll) {
                                this.scroll.refresh();
                                this.scroll.scrollTo(0, this.scrollY);
                        }
                        this.mainId = parseInt(this.$route.params.mainId);
                        this.subId = parseInt(this.$route.params.subId);
                },
                deactivated() { if(this.scroll) this.scrollY = this.scroll.y; },
	        updated() {
                        this._initAndRefreshNavScroll();
                        this._initAndRefreshContentScroll();
                },
                destroyed() {
                        if(this.scroll) this.scroll.destroy();
                        if(this.navScroll) this.navScroll.destroy();
                },
                // 路由守卫
	        beforeRouteUpdate(to, from, next) { // 路由从激活到激活时，且路由传参的参数变化时，才会被调用
                        this.subId = parseInt(to.params.subId);
                        next();
	        }
        };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		display: flex
		flex-direction: column
		width: 100%
		height:100%
		font-size: 0.24rem
	.header
		.header-top
			position: relative
			flex-shrink: 0
			height: 0.9rem
			a
				position: absolute
				top: 0
				left: 0
				height: 0.9rem
				width: 0.9rem
				text-align: center
				line-height: 0.9rem
				font-size: 0.4rem
			h1
				font-weight: normal
				font-size: 0.32rem
				text-align: center
				height: 100%
				line-height: 0.9rem
		.header-nav
			overflow: hidden
			ul
				display: flex
				li
					flex-shrink: 0
					a
						display: block
						padding: 0 0.26rem
						height: 0.8rem
						line-height: 0.8rem
						color: rgb(105,105,105)
						border-bottom: 0.05rem solid transparent
						box-sizing: border-box
						&.active
							border-bottom-color: rgb(132,95,63)
							color: rgb(132,95,63)
	.content
		padding: 0.2rem
		overflow: hidden
		flex-grow: 1
		border-top: 0.02rem solid rgb(230,230,230)
		ul
			margin-right: -0.2rem
			li
				margin-bottom: 0.4rem
				box-sizing: border-box
				float: left
				width: 50%
				padding-right: 0.2rem
				a
					display: flex
					flex-direction: column
					.avatar-wrapper
						position: relative
						width: 100%
						padding-top: 100%
						background-color: rgba(0,0,0,0.02)
					img
						position: absolute
						top: 50%
						left: 50%
						width: 60%
						transform: translate(-50%,-50%)
					p
						background-color: rgb(246,242,241)
						color: rgb(159,128,82)
						height: 0.64rem
						line-height: 0.64rem
						text-indent: 0.1rem
					h3
						margin: 0.12rem 0
						color: rgb(51,51,51)
						font-weight: normal
					span
						font-size: 0.28rem
						color: rgb(182,9,9)
</style>
