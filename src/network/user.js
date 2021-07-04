import request from './request';

export function loginStatus(cookie) {
    return request({
        url: '/login/status',
        method: 'get',
    })
}

//用户登陆
export function login(account, password) {
    return request({
        url: '/login/cellphone',
        method: 'post',
        data: {
            phone: `${account}`,
            password: password
        }
    })
}

//刷新登陆状态
export function loginRefresh(cookie) {
    // ''('network cookie', cookie);
    return request({
        url: '/login/refresh',
        method: 'get'
    })
}

//用户歌单
export function getMymusic(uid) {
    return request({
        url: '/user/playlist',
        method: 'get',
        params: {
            uid
        }
    })
}

//创建歌单
export function createList(name, cookie) {
    return request({
        url: '/playlist/create',
        method: 'get',
        params: {
            name
        }
    })
}

//删除歌单
export function delList(id) {
    return request({
        url: '/playlist/delete',
        method: 'get',
        params: {
            id
        }
    })
}

//获取用户信息
export function account() {
    return request({
        url: '/user/account',
        method: 'get'
    })
}

//获取收藏歌手列表
export function artistSub() {
    const data = new Date().getTime();
    return request({
        url: '/artist/sublist',
        method: 'post',
        params: {
            timestamp: data
        }
    })
}

//退出登陆
export function loginout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}