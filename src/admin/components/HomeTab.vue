<template>
	<el-tabs type="card" closable
	         :value="activeName"
	         @tab-click="(tab) => toggleTab(tab.name)"
	         @tab-remove="removeTab">
		<el-tab-pane v-for="item in list" :key="item" :name="item">
			<span slot="label"><i class="el-icon-edit-outline"></i>&nbsp;{{ tabMap[item].label }}</span>
			<component :is="tabMap[item].component"></component>
		</el-tab-pane>
	</el-tabs>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';
	import TabPassword from './TabPassword.vue';
        import TabCategory from './TabCategory.vue';
        import TabProduct from './TabProduct.vue';
        let { mapState, mapMutations } = createNamespacedHelpers('tab');

        export default {
                data() {
                        return {
                                tabMap: {
                                        password: {
                                                label: '密码修改',
	                                        component: TabPassword
                                        },
                                        category: {
                                                label: '分类管理',
                                                component: TabCategory
                                        },
                                        product: {
                                                label: '列表管理',
                                                component: TabProduct
                                        },
                                }
                        }

                },
	        //非自定义，所以不需要...和{}
	        computed: mapState(['list', 'activeName']), // 映射放在计算属性里面
	        methods: mapMutations(['toggleTab', 'removeTab'])
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>