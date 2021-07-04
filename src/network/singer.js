import request from './request'
import getIds from '../utils/getIds'
//歌手详情
export function singerInfo(id) {
    return request({
        method: 'get',
        url: '/artist/detail',
        params: {
            id
        }
    })
}
//歌手描述
export function singerDesc(id) {
    return request({
        method: 'get',
        url: '/artist/desc',
        params: {
            id
        }
    })
}
//歌手热门歌曲50首
export function song50(id) {
    return request({
        method: 'get',
        url: '/artist/top/song',
        params: {
            id
        }
    })
}

//歌曲url
export function songUrl(id) {
    let ids = getIds(id);
    return request({
        method: "get",
        url: '/song/url',
        params: {
            id: ids
        }
    })
}
//歌词
export function lyric(id) {
    return request({
        method: 'get',
        url: '/lyric',
        params: {
            id
        }
    })
}

//收藏 t=1/ t=other 取消收藏 歌手
export function subArtist(t, id) {
    return request({
        url: '/artist/sub',
        method: 'post',
        params: {
            t,
            id
        }
    })
}