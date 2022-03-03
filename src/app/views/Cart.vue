<template>
	<div class="page-wrapper">
		<header>
			<h1>购物车</h1>
			<button class="btn-edit" @click="isEdit = !isEdit" v-text="isEdit ? '完成' : '编辑'"></button>
		</header>
		<div class="content">
			<ul class="cart-list" v-if="list.length > 0">
				<li v-for="item in list" :key="item.id">
					<span class="checkbox" :class="{ checked: item.active1 }" v-show="!isEdit" @click="item.active1 = !item.active1"></span>
					<span class="checkbox" :class="{ checked: item.active2 }" v-show="isEdit" @click="item.active2 = !item.active2"></span>
					<router-link :to="`/detail/${ item.pid }`" class="avatar-wrapper">
						<img :src="item.avatar" alt="">
					</router-link>
					<div class="info">
						<router-link :to="`/detail/${ item.pid }`" class="name" v-text="item.name"></router-link>
						<router-link :to="`/detail/${ item.pid }`" class="price-wrapper">￥<span class="price" v-text="item.price"></span></router-link>
						<div class="count-wrapper">
							<NumCount :count="item.count"
							          @increase="increase(item)"
							          @decrease="decrease(item)">
							</NumCount>
						</div>
					</div>
				</li>
			</ul>
			<p v-else>购物车暂无商品</p>
		</div>
		<footer class="footer-normal" v-show="!isEdit">
			<div class="all-wrapper">
				<span class="checkbox all" :class="{ checked: active1 }" @click="changeAll1(active1)"></span>&nbsp;全选
			</div>
			<div class="total-price-wrapper">
				合计：<em>￥<span class="total-price" v-text="totalPrice"></span></em>
			</div>
			<button class="btn-settlement" @click="settlement">结算<span class="total-count" v-text="totalCount > 0 ? `(${ totalCount })` : ''"></span></button>
		</footer>
		<footer class="footer-edit" v-show="isEdit">
			<div class="all-wrapper">
				<span class="checkbox all" :class="{ checked: active2 }" @click="changeAll2(active2)"></span> 全选
			</div>
			<button class="btn-remove" @click="remove">删除</button>
		</footer>
	</div>
</template>
<script>
        import NumCount from '../components/NumCount.vue';

        export default {
                components: { NumCount },
                data: function(){
                        return {
                                isEdit: false, //是否编辑
                                list: []

                        };
                },
                computed: {
                        active1: function(){
                                return !this.list.find(item => item.active1 === false)
                        },
                        active2: function(){
                                return !this.list.find(item => item.active2 === false)
                        },
                        totalPrice: function(){
                                var result = 0;
                                this.list.filter(item =>item.active1).forEach(item => result += item.count * item.price);
                                return result;
                        },
                        totalCount: function(){
                                var result = 0;
                                this.list.filter(item => item.active1).forEach(item => result += item.count);
                                return result;
                        }
                },
                created: function(){
                        this._getCartData();
                },
                methods: {
                        _getCartData: function(){
                                this.$http({
                                        method: 'post',
                                        url: '/cart/list'
                                }).then(data => {
                                        data.forEach(item => {
                                                item.active1 = true;
                                                item.active2 = false;
                                        });
                                        this.list = data;
                                })
                        },
                        changeAll1: function(flag){
                                this.list.forEach(item => item.active1 = !flag);
                        },
                        changeAll2: function(flag){
                                this.list.forEach(item => item.active2 = !flag);
                        },
                        decrease: function(item){
                                if(item.count === 1) {
                                        alert('商品数量已达下限');
                                        return;
                                }
                                this.$http({
                                        method: 'post',
                                        url: '/cart/decrease',
                                        data: { id: item.id },
                                }).then(data => item.count -= 1);
                        },
                        increase: function(item){
                                if(item.count === 5) {
                                        alert('商品数量已达上限');
                                        return;
                                }
                                this.$http({
                                        method: 'post',
                                        url: '/cart/increase',
                                        data: { id: item.id },
                                }).then(data => item.count += 1);
                        },
                        remove: function(){
                                let activeList = this.list.filter(item => item.active2);
                                if(activeList.length < 1) {
                                        alert('请先选择');
                                        return;
                                }
                                if(!confirm('最近穷？')) return;
                                let ids = [];
                                activeList.forEach(item => ids.push(item.id));

                                this.$http({
                                        method: 'post',
                                        url: '/cart/remove',
                                        data: { ids: JSON.stringify(ids) }
                                }).then(data => {
                                        ids.forEach(item => {
                                                for(let i = 0; i < this.list.length; i++) {
                                                        if(this.list[i].id === item) {
                                                                this.list.splice(i, 1);
                                                                break;
                                                        }
                                                }
                                        })
                                });
                        },
                        settlement: function(){
                                let activeList = this.list.filter(item => item.active1);
                                if(activeList.length < 1) {
                                        alert('请先选择');
                                        return;
                                }
                                let ids = [];
                                activeList.forEach(item => ids.push(item.id));
                                this.$http({
                                        method: 'post',
                                        url: '/cart/settlement',
                                        data: {
                                                ids: JSON.stringify(ids),
                                                account: this.totalPrice
                                        }
                                }).then(data => {
                                        ids.forEach(item => {
                                                for(let i = 0; i < this.list.length; i++) {
                                                        if(this.list[i].id === item) {
                                                                this.list.splice(i, 1);
                                                                break;
                                                        }
                                                }
                                        });
                                        this.$router.push('/');
                                })
                        }
                }

        };
</script>
<style scoped>
	.page-wrapper {
		display: flex;
		flex-direction:column;
	}
	button {
		border: none;
		outline:none;
		background-color: transparent;
	}
	span.checkbox {
		display: inline-block;
		width: 0.36rem;
		height: 0.36rem;
		background-image: url(../assets/images/icon_checkbox_uncheck.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	span.checkbox.checked {
		background-image: url(../assets/images/icon_checkbox_check.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	header {
		position: relative;
		height: 0.8rem;
		background-color: #ff6700;
		flex-shrink: 0;
	}
	header>* {
		color: #fff;
		height: 0.8rem;
		line-height: 0.8rem;
	}
	header h1 {
		font-size: 0.32rem;
		font-weight:normal;
		text-align: center;
	}
	header button.btn-edit {
		position: absolute;
		padding: 0 0.4rem;
		top: 0;
		right: 0;
		font-size: 0.28rem;
	}
	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 1.2rem;
		flex-shrink: 0;
		padding: 0 0.2rem;
	}
	.footer-normal {  }
	footer button {
		width: 2rem;
		height: 0.76rem;
		background-color: rgb(189,17,17);
		border-radius: 0.38rem;
		color: #fff;
		font-size: 0.32rem;
	}
	.content {
		flex-grow: 1;
		overflow: auto;
		border-bottom: 0.02rem solid #b0b0b0;
	}
	.all-wrapper {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}
	.total-price-wrapper {
		text-align: right;
		flex-grow:1;
		padding-right: 0.2rem;
	}
	.total-price-wrapper em {
		color: rgb(191,17,17);
		font-style: normal;
	}
	ul.cart-list {
		padding: 0 0.2rem;
	}
	ul.cart-list li {
		display: flex;
		padding: 0.2rem 0;
	}
	ul.cart-list li>span.checkbox {
		flex-shrink: 0;
		align-self:center;
	}
	ul.cart-list li>span.checkbox.edit {
	}
	ul.cart-list li>a.avatar-wrapper {
		width: 1.72rem;
		height: 1.72rem;
		background-color: rgba(0,0,0,0.2);
		border-radius: 0.08rem;
		margin: 0 0.2rem;
	}
	ul.cart-list li>a.avatar-wrapper>img {
		width: 100%;
		height:100%;
		transform: scale(0.7);
	}
	ul.cart-list li>.info {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		position: relative;
	}
	ul.cart-list li>.info>a.name { color: rgb(51,51,51); }
	ul.cart-list li>.info>a.price-wrapper { color: rgb(191,17,17); margin-top: 0.2rem; }
	ul.cart-list li>.info>.count-wrapper {
		position: absolute;
		right: 0;
		bottom: 0;
	}
</style>