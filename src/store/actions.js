import {
    songUrl
} from "../network/singer";

const actions = {
    setSongs({
        commit
    }, payLoad) {
        commit('setPlaylist', payLoad);
        commit('setMusicIndex', payLoad);
    },
    async setPlaymusic({
        commit,
        state
    }, payLoad) {
        let id;
        console.log('payload', payLoad);
        if (state.ordinal || payLoad.itemClick) {
            // 顺序播放
            id = state.tracksId[payLoad.index].id;
        } else {
            //随机播放
            id = state.randomId[payLoad.index].id;
        }
        let urlData = await songUrl(id);
        //设置state当前播放歌曲信息数
        commit('setSongs', urlData.data.data[0])
        //设置state当前播放歌曲index
        commit('setMusicIndex', {
            musicIndex: payLoad.index
        });
    },
    //点击列表
    async listMusic({
        commit,
        state
    }, payLoad) {
        const id = state.tracksId[payLoad].id;
        let urlData = await songUrl(id);
        commit('setSongs', urlData.data.data[0])
    }
}
export default actions;