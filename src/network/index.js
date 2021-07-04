import request from './request'
//推荐歌单
export function personalized(limit) {
    return request({
        method: 'get',
        url: `/personalized`,
        params: {
            limit
        }
    })
}

//榜单
export function topList() {
    return request({
        method: 'get',
        url: '/toplist'
    })
}

//歌单详情
export function playList(id) {
    let time = new Date().getTime();
    return request({
        method: 'get',
        url: '/playlist/detail',
        params: {
            id,
            timestamp: time
        }
    })
}

//歌曲详情
export function song(id) {
    function getId(item, index) {
        if (index === 0) {
            return item.id ? `${item.id}` : `${item}`;
        }
        return item.id ? `,${item.id}` : `,${item}`
    }
    let ids = ''
    if (Array.isArray(id)) {
        id.forEach((item, index) => {
            ids += getId(item, index);
        });
    } else {
        ids = id;
    }
    return request({
        method: 'get',
        url: '/song/detail',
        params: {
            ids: ids
        }
    })
}

//专辑内容
export function songPic() {

    return request({
        method: 'get',
        url: '/album?id=34209'
    })
}

//精品歌单标签列表
export function quailtySongsTag() {
    return request({
        method: 'get',
        url: '/playlist/highquality/tags'
    })
}

//精品歌单  
export function quailtySongs(tag    , num, before) {
    let url = tag && num && before ? `/top/playlist/highquality?cat=${tag}&before=${before}&limit=${num}` :
        tag && num ? `top/playlist/highquality?cat=${tag}&limit=${num}` :
        typeof (tag) === 'number' ? `top/playlist/highquality?limit=${tag}` :
        `top/playlist/highquality?limit=${num}`;
    // ''('精品歌单url =>', url);
    return request({
        method: 'post',
        url: url
    })
}

//新歌速递
export function newSong(type) {
    let t = type ? type : 0;
    // ''('t', t);
    return request({
        method: 'get',
        url: '/top/song',
        params: {
            type,
        }
    })
}

//热门歌手
export function hotSinger(limit, offset) {
    return request({
        method: 'get',
        url: '/top/artists',
        params: {
            limit,
            offset: offset ? offset : 0
        }
    })
}

//歌单分类
export function songList() {
    return request({
        method: 'get',
        url: '/playlist/catlist'
    })
}

//歌单
export function play(cat, offset) {
    let url = typeof (cat) == 'string' && typeof (offset) == 'number' ? `/top/playlist?cat=${cat}&offset=${offset}&limit=20` :
        typeof (cat) == 'number' ? `/top/playlist?offset=${cat}&limit=20` : `/top/playlist?cat=${cat}&limit=20`;
    // ''('url =>', url);
    return request({
        method: 'get',
        url: url
    })
}


//歌曲是否可用
export function check(id) {
    return request({
        method: 'get',
        url: '/check/music',
        params: {
            id: id
        }
    })
}