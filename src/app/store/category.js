export default {
        namespaced: true, //为了解决不同模块命名冲突的问题
        state: {
                mainList: [],  // 分类页面的所有一级分类
                subLists: {},  //所有用户看过的二级分类列表
                curCid: 0  // 当前激活的一级分类的id值
        },
        getters: {
                subList(state, getters) {  //当前用户正在看的二级分类列表
                        return state.subLists[state.curCid] || [];
                }
        },
        mutations: {
                _initMainList(state, payload) { state.mainList = payload; },
                _changeCurCid(state, payload) { state.curCid = payload },
                _initSubLists(state, payload) {
                        let temp = {};
                        temp[state.curCid] = payload;
                        state.subLists = {
                                ...temp,
                                ...state.subLists
                        };
                }
        },
        actions: {
                initMainList({ commit, dispatch, rootState }) {
                        rootState.http({ url: '/category/main' })
                                .then(data => {
                                        commit('_initMainList', data);
                                        dispatch('initSubLists', data[0].id);
                                });
                },
                initSubLists({ state, commit, rootState }, payload) {
                        commit('_changeCurCid', payload);
                        if(typeof state.subLists[payload] !== 'undefined') return;
                        rootState.http({
                                params: {id: payload},
                                url: '/category/sub',  //请求的路由地址
                        })
                                .then(data => commit('_initSubLists', data) );
                }
        }
}