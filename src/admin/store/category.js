export default {
        namespaced: true,
        state: {
                isMainListInit: false,               // 标识一级分类信息有没有被初始化过
                mainList: [],                           // 分类页面的所有一级分类
                subLists: {},                         //所有用户看过的二级分类列表
        },
        getters: {
                //  subList(state, getters){  //当前用户正在看的二级分类列表
                //          return state.subLists[state.curCid] || [];
                // }
        },
        mutations: {
                _initMainList(state, payload){
                        state.isMainListInit = true;
                        state.mainList = payload;
                },
                _initSubLists(state, payload){
                        state.subLists = {
                                ...payload,
                                ...state.subLists
                        };
                },
                _removeCategory(state, payload){
                        let i = state.mainList.findIndex(item => item.id === payload);
                        if(i !== -1){
                                state.mainList.splice(i, 1);
                                return;
                        }
                        for(key in state.subList){
                                i = state.subList[key].findIndex(item => item.id === payload);
                                if(i !== -1){
                                        state.subLists[key].splice(i, 1);
                                        break;
                                }
                        }
                },
                _addCategory(state, payload){
                        if(payload.fid === 0)
                                state.mainList.push(payload);
                        if(payload.fid !== 0 && typeof state.subLists[payload.fid] !== 'undefined')
                                state.subLists[payload.fid].push(payload);
                },
                _updateCategory(state, payload){
                        let obj = {
                                id: payload.id,
                                fid: payload.fid,
                                name: payload.name,
                                avatar: payload.oldAvatar === payload.avatar ? payload.avatar: `/images/category/${ payload.avatar }`
                        };
                        let i = -1;
                        if(payload.fid === 0) {  // 修改一级分类
                                i = state.mainList.findIndex(item => item.id === payload.id);
                                state.mainList[i] = obj;
                        } else {  // 修改二级分类
                                for(let key in state.subLists) {
                                        i = state.subLists[key].findIndex(item => item.id === payload.id);
                                        if(i !== -1) {
                                                if(payload.fid.toString() === key) state.subLists[key][i] = obj;
                                                else {
                                                        state.subLists[key].splice(i, 1);
                                                        if(typeof  state.subLists[payload.fid] !== 'undefined') state.subLists[payload.fid].push(obj);
                                                }
                                                break;
                                        }
                                }

                        }
                }
        },
        actions: {
                initMainList({ state, commit, dispatch, rootState }){
                        if(state.isMainListInit) return Promise.resolve();
                        else return rootState.http({url: '/category/main'})
                                .then(data =>{
                                        commit('_initMainList', data);
                                });
                },
                initSubLists({state, commit, rootState}, payload){
                        if(typeof state.subLists[payload] !== 'undefined') return Promise.resolve();
                        else return rootState.http({
                                params: {id: payload},
                                url: '/category/sub',  //请求的路由地址
                        })
                                .then(data => {
                                        let temp = {};
                                        temp[payload] = data;
                                        commit('_initSubLists', temp);
                                });
                },
                removeCategory({ rootState, commit }, { id, avatar }) {
                        return rootState.http({
                                method: 'post',
                                data: { id, avatar },
                                url: '/category/remove'
                        })
                                .then(data => commit('_removeCategory', id));
                },
                addCategory({ rootState, commit }, payload) {
                        return rootState.http({
                                method: 'post',
                                url: '/category/add',
                                data: payload
                        })
                                .then(data => {  // 这个data表示id
                                        let temp = {};
                                        temp.id = data;
                                        temp.name = payload.name;
                                        temp.fid = payload.fid;
                                        temp.avatar = `/images/category/${ payload.avatar }`;
                                        // 调用mutations中的方法更新仓库的数据
                                        commit('_addCategory', temp);
                                        // 给组件返回一个结果
                                        return temp;
                                });
                },
                updateCategory({ rootState, commit }, payload) {
                        return rootState.http({
                                method: 'post',
                                url: '/category/update',
                                data: payload
                        })
                        // 调用mutations中的方法更新仓库的数据
                                .then(() => commit('_updateCategory', payload));
                }
        }

}