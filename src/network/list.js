import request from './request';
// op: add 添加歌曲但歌单  del 删除歌曲到歌单
export function markMusic(op, pid, tracks){
    console.log(123);
    const time = new Date().getTime();
    console.log('time', time, 'op', op, 'pid', pid, 'tracks', tracks);
    return request({
        url: '/playlist/tracks',
        method: 'post',
        params: {
            op,
            pid,
            tracks,
            timestamp: time
        }
    })
}
//私人fm
export function personalFm(cookie) {
    const time = new Date().getTime();
    return request({
        url: '/personal_fm',
        method: 'post',
        params: {
            timestamp: time
        }
    })
}
//dislike
export function trash(id) {
    return request({
        url: '/fm_trash',
        method: 'post',
        params: {
            id
        }
    })
}

//收藏 / 取消收藏 歌单
export function markLlst(t, id) {
    return request({
        url: '/playlist/subscribe',
        method: 'post',
        params: {
            t,id
        }
    })
}