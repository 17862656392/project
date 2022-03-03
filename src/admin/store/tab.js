export default {
        namespaced: true,
        state: {
                list: [],
                activeName: ''
        },
        getters: {},
        mutations: { //commit调用
                addTab(state, payload) {
                        if(state.list.indexOf(payload) === -1) state.list.push(payload);//indexOf：找数组中的元素，为-1，表示找不到
                        state.activeName = payload;
                },
                toggleTab(state, payload) { state.activeName = payload; },
                removeTab(state, payload) {
                        state.list.splice(state.list.indexOf(payload), 1);
                        state.activeName = state.list[0] || '';
                }
        },
        actions: {}
};