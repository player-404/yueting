import { quailtySongsTag } from "../../network/index";
const actions = {
    //获取精品歌单数据
    async getQualityTag({ dispatch, commit, getters, rootGetters }) {
        const data = await quailtySongsTag();
        console.log("data", data);
        const tags = data.data.tags;
        commit('setTags', tags)
    }
}
export default actions