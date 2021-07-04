const mutations = {
    //获取列表中正在播放的index
    getPlayingIndex(state, payload) {
        state.playIndex = payload;
    },
    setLikeDataChange(state, payload) {
        state.likeDataChange = payload;
    }
    
}
export default mutations;