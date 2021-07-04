const mutations = {
    //设置点击歌曲信息
    setCurrentItem(state, payload) {
        state.currentItem = payload;
    },
    //设置当前歌曲播放时间
    setCurrentTime(state, payload) {
        state.currentTime = payload;
    },
    //设置歌曲时长
    setSongDuration(state, payload) {
        state.duration = payload;
    },
    //设置播放状态
    setPlayStatus(state, payload) {
        state.canPlay = payload;
    },
    //歌曲当前播放秒数
    setCurrentSecond(state, payload) {
        state.currentSecond = payload;
    },
    //设置播放时间
    setSecTime(state, payload) {
        state.setSec = payload;
        // ''('播放时间', state.setSec);
    },
    //收藏歌单消息提示
    setTips(state, payLoad) {
        const { status, message, successMsg, errorMsg } = payLoad;
        state.tipsBar.status = status;
        state.tipsBar.message = message
        state.tipsBar.successMsg = successMsg;
        state.tipsBar.errorMsg = errorMsg;
    },
    setLoop(state, payload) {
        state.loop = payload;
    }

}
export default mutations;