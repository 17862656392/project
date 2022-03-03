export default {
        namespaced: true,
        // 保存要放在仓库中的数据
        state: {
                list: [],
                pageSize: 6
        },
        // 存放仓库的计算属性
        getters: {},
        // 只有mutations中的方法代码可以直接修改state中保存的数据(同步的代码 )
        mutations: {
                _resetData(state) { state.list = []; },
                _endAjax(state, payload) { if(payload.length > 0) state.list = state.list.concat(payload); }
        },
        // 主要存放异步的耗时的代码
        actions: {
                // {subId: ?, loadMore: true}
                getData({ state, commit, rootState}, { subId, loadMore }) {
                        if(!loadMore) commit('_resetData');
                        return rootState.http({
                                method: 'post',                                                 //请求的类型
                                data: {
                                        cid: subId,
                                        begin: state.list.length,                                //从第几条开始拿数据
                                        count: state.pageSize                                  //这次请求要多少条数据
                                },   //请求携带的参数
                                url: 'product/list',                                            //请求的路由地址
                        }).then(data => {
                                commit('_endAjax', data);
                                return data.length === state.pageSize;
                        });
                }
        }
}