//创建仓库对象并导出
import Vue from 'vue';
import Vuex from 'vuex';
import http from '../utils/http.js';
import category from './category.js';
import product from './product.js';
import alert from './alert.js';
//向vue体系注入vuex仓库体系
Vue.use(Vuex);

//创建仓库对象并导出
export default new Vuex.Store({
        // 保存要放在仓库中的数据
        state: {
                http
        },
        // 存放仓库的计算属性
        getters: {},
        // 只有mutations中的方法代码可以直接修改state中保存的数据(同步的代码 )
        mutations: {},
        // 主要存放异步的耗时的代码
        actions: {},

        modules: { category, product, alert }
});















