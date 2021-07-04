const mutations = {
    setTags(state, payload) {
        state.tags = payload;
    },
    setTagIndex(state, payload) {
        state.tagIndex = payload;
    },
    setSelectName(state, payload) {
        state.selectName = payload;
    },
    setFmIndex(state, payload) {
        state.fmIndex = payload;
    },
    setFmInfo(state, payload) {
        state.fmInfo = payload;
    },
    setFmStatus(state, payload) {
        state.fmStatus = payload;
    }
}
export default mutations;