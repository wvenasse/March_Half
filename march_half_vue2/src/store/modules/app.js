const app = {
    state: {
        isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
    },
    getters: { //computed
        isCollapse: state => state.isCollapse
    },
    mutations: {
        SET_COLLAPSE(state) {
            state.isCollapse = !state.isCollapse;
            sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
        },
    },
    actions: {
        setMenuStatus(content, data) {
            content.commit('SET_COLLAPSE');
            console.log(data);
        }
    },
    // console.log(root.$store.state.count);
    // console.log(root.$store.getters.count);
    // root.$store.commit('SET_COUNT',100)
}

export default app;
// namespaced: true