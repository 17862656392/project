<template>
	<div class="page-wrapper">
		<div class="header">
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div class="content">
			<div class="left" ref="left">
				<ul class="category-main">
					<li v-for="item in mainList" :key="item.id"
					    :class="{ active: item.id === curCid }"
					    @click = "initSubLists(item.id)" >
						<span v-text="item.name"></span>
					</li>
				</ul>
			</div>
			<div class="right" ref="right">
				<div>
					<div class="avatar-wrapper" v-if="avatar">
						<img :src="avatar" class="avatar" >
					</div>
					<ul class="category-sub clearfix" v-if="subList.length > 0">
						<li v-for="item in subList" :key="item.id">
							<router-link :to="`/list/${ curCid }/${ item.id }`">
								<img :src="item.avatar"/>
								<span v-text="item.name"></span>
							</router-link>
						</li>
					</ul>
					<p v-else>暂无二级分类，敬请期待...</p>
				</div>
			</div>
		</div>
		<div class="footer">
			<MiNav></MiNav>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import imagesLoaded from 'imagesloaded';
	import MiNav from '../components/MiNav.vue';
	import { createNamespacedHelpers } from 'vuex'
	let { mapState, mapGetters, mapActions } = createNamespacedHelpers('category');

        export default {
                components: { MiNav },
                computed: {
	                ...mapState(['mainList', 'curCid']),
	                ...mapGetters(['subList']),
                        avatar() {
                                if(this.curCid === 0) return '';
                                else return this.mainList.find(item => item.id === this.curCid).avatar;
                        }
                },
                methods: {
	                ...mapActions(['initMainList', 'initSubLists']),
	                _initLeftScroll() { if(!this.leftScroll) this.leftScroll = new BScroll(this.$refs.left, {click: true});  },
                        _initAndRefreshRightScroll() {
                                imagesLoaded(this.$refs.right, () =>{
                                        this.$nextTick(() => { //$nextTick()等同设置的setTimeout()
                                                if(!this.rightScroll) this.rightScroll = new BScroll(this.$refs.right, {click: true});
                                                else {
                                                        this.rightScroll.scrollTo(0, 0);
                                                        this.rightScroll.refresh();
                                                }
                                        });
                                });
                        }
                },
                //创建
                created: function(){ this.initMainList(); },
                updated: function(){
                        this._initLeftScroll();
                        this._initAndRefreshRightScroll();
                }
        };
</script>
<style scoped>
	.page-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.content {
		display: flex;
		flex-grow: 1;
		overflow: auto;
	}
	content .right {
		overflow: hidden;
	}

	.footer {
		/*position: fixed;*/
		/*bottom: 0;*/
		/*left: 0;*/
		width: 100%;
		z-index: 100;
		background-color: white;
	}
	.header {
		height: 0.8rem;
		flex: none;
	}
	.content .left {
		width: 2rem;
		flex-shrink: 0;
		border-right: 0.02rem solid #ccc;
		overflow: auto;
	}
	.right ul {
		overflow: auto;
	}
	.left {
		flex-shrink: 0;
	}

	.left ul {
		overflow: hidden;
	}
	.left li {
		padding: 0.2rem 0;
	}
	.left li>span {
		display: block;
		text-align: center;
		height: 0.48rem;
		line-height:0.48rem;
		color: rgb(51,51,51);
		border-left: 0.06rem solid transparent;
	}
	.left li.active>span {
		color: rgb(132,95,63);
		border-left: 0.06rem solid rgb(132,95,63);
	}
	.content {
		overflow: auto;
	}
	.content .right {
		flex-grow: 1;
		overflow-y: auto;
	}
	.right .avatar-wrapper {
		padding: 0.32rem 0.32rem 0;
	}
	.right .avatar-wrapper>img {
		width: 100%;
	}
	.right li {
		text-align: center;
		box-sizing: border-box;
		float: left;
		width: 33.333333%;
		padding: 0.26rem;
	}
	.right li a {
		display: block;
	}
	.right li img {
		width: 100%;
	}
</style>