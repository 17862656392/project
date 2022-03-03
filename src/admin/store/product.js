export default {
        namespaced: true,
        state: { list: [] },
        getters: {},
        mutations: {
                _updateList(state, payload) { console.log(payload); state.list = payload; },
                uploadBanner(state, { id, filePath }) {
                        let i = state.list.findIndex(item => item.id === id);
                        let temp = { ...state.list[i] };
                        if(temp.bannerImg !== '') {
                                temp.bannerImg = temp.bannerImg.split(',');
                                temp.bannerImg.push(filePath);
                                temp.bannerImg = temp.bannerImg.join(',');
                        } else temp.bannerImg = filePath;
                        state.list.splice(i, 1, temp);
                },
                _removeBanner(state, {id, newBannerImg}) {
                        let i = state.list.findIndex(item => item.id === id);
                        let temp = { ...state.list[i] };
                        temp.bannerImg = newBannerImg;
                        state.list.splice(i, 1, temp);
                }
        },
        actions: {
                getData({ commit, rootState }, payload) {
                        return rootState.http({
                                method: 'post',
                                data: payload,
                                url: '/product/admin-list'
                        })
                                .then(data => {
                                        commit('_updateList', data.list);
                                        return data.total;
                                })
                },
                removeBanner({ state, rootState, commit }, { id, filePath }) {
                        let oldBannerImg = state.list.find(item => item.id === id).bannerImg;
                        let newBannerImg = '';
                        if(oldBannerImg !== filePath) {
                                let arr = oldBannerImg.split(',');
                                arr.splice(arr.indexOf(filePath), 1);
                                newBannerImg = arr.join(',');
                        }
                        return rootState.http({
                                method: 'post',
                                url: '/product/banner/remove',
                                data: { id, filePath, newBannerImg }
                        })
                                .then(() => commit('_removeBanner', { id, newBannerImg }));

                }
        }
}