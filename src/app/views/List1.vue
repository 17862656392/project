<template>
	<div class="page-wrapper">
		<div class="header">
			<div class="header-top">
				<router-link to="/category">&lt;</router-link>
				<h1 class="title" v-text="title"></h1>
			</div>
			<div class="header-nav" ref="nav">
				<ul>
					<li v-for="item in subCategoryList" :key="item.id">
						<router-link :to="`/list/${ item.id }/${ item.name }`" v-text="item.name"></router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="content" ref="content">
			<div>
				<ul class="clearfix" v-if="list.length > 0">
					<li v-for="item in list" :key="item.id">
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
				<p v-show="!hasMore">已到达底部</p>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
        import BScroll from 'better-scroll';
        import imagesLoaded from 'imagesloaded';

        export default {
                data() {
                        return {
                                mainId: 0,
                                subId: 0,
                                cid: 0,
                                isLoading: false,       //标识当前是不是在加载更多
                                hasMore: true,          //标识是不是还有更多的商品可以加载
                                title: '',
                                list: [],
                                pageSize: 6,             //标识页容量
                                scrollY: 0,
                                subCategoryList: [
                                        { id: 13, name: 'tab13' },
                                        { id: 14, name: 'tab14' },
                                        { id: 15, name: 'tab15' },
                                        { id: 16, name: 'tab16' },
                                        { id: 17, name: 'tab17' },
                                        { id: 18, name: 'tab18' },
                                        { id: 19, name: 'tab19' },
                                        { id: 20, name: 'tab20' },
                                        { id: 21, name: 'tab21' },
                                        { id: 22, name: 'tab22' },
                                        { id: 23, name: 'tab23' },
                                        { id: 24, name: 'tab24' },
                                        { id: 25, name: 'tab25' },
                                ]
                        }
                },
                methods: {
                        _getData() {
                                this.isLoading = true;                                                  //开始请求数据，显示loading
                                this.$http({
                                        method: 'post',                                                 //请求的类型
                                        data: {
                                                cid: this.cid,
                                                begin: this.list.length,                                //从第几条开始拿数据
                                                count: this.pageSize                                  //这次请求要多少条数据
                                        },   //请求携带的参数
                                        url: 'product/list',                                            //请求的路由地址
                                })
                                        .then(data => {
                                                this.isLoading = false;                              //数据请求完毕，关闭loading
                                                if(data.length < this.pageSize) this.hasMore =false;
                                                if(data.length > 0) this.list = this.list.concat(data);         //追加数据加载
                                        });
                        },
                        _initAndRefreshContentScroll() {
                                this.$nextTick( () => {
                                        imagesLoaded(this.$refs.content, () => {
                                                if(!this.scroll) {
                                                        this.scroll = new BScroll(this.$refs.content, {
                                                                click: true,
                                                                pullUpLoad: {
                                                                        threshold: -50  //触发pullingUp事件的临界距离
                                                                }
                                                        });
                                                        this.scroll.on('pullingUp', () => this._getData());
                                                }
                                                else this.scroll.refresh();
                                        });
                                });
                        }
                },
                watch: {
                        isLoading(newValue, oldValue) {
                                //isloading从 true-> false 变化一次，就说明完成了一次ajax请求
                                if((!newValue) && this.hasMore && this.scroll) this.scroll.finishPullUp();
                        },
                        cid(newValue, oldValue) {
                                this.title = this.$route.params.name;
                                this.list = [];
                                this.hasMore = true,
                                        this._getData();
                        }
                },
                activated() {
                        this.cid = parseInt(this.$route.params.cid);
                        if(this.scroll) {
                                this.scroll.refresh();
                                this.scroll.scrollTo(0, this.scrollY);
                        }
                },
                deactivated() { this.scrollY = this.scroll.y; },
                updated() { this._initAndRefreshContentScroll(); },
                destroyed() {
                        if(this.scroll) this.scroll.destroy();          //销毁better-scroll对象，释放内存空间
                },
                mounted() {
                        let ul = this.$refs.nav.querySelector('ul');
                        let lis = this.$refs.nav.querySelectorAll('li');
                        let lastLi = lis[lis.length - 1];
                        let width = lastLi.offsetLeft + lastLi.clientWidth;
                        ul.style.width = width + 'px';
                        this.navScroll = new BScroll(this.$refs.nav, {
                                scrollX: true,
                                scrollY: false,
                                click: true
                        });
                },
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
