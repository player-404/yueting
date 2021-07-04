import request from './request'
//热搜
export function trending() {
    return request({
        url: '/search/hot/detail',
        method: 'get'
    })
}
//搜索
export function search(keywords, type) {
    return request({
        url: '/search',
        method: 'get',
        params: {
            keywords,
            type
        }
    })
}
//搜索建议
export function suggest(keywords) {
    return request({
        url: '/search/suggest',
        method: 'get',
        params: {
            keywords
        }
    })

}

//关注&取消关注 用户
export function follow(id, t) {
    return request({
        url: '/follow',
        params: {
            id,
            t
        }
    })
}

//收藏 歌手
export function sub(id, t) {
    return request({
        url: '/artist/sub',
        method: 'get',
        params: {
            id,
            t
        }
    })
}