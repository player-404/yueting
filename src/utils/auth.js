import Cookies from 'js-cookie'

//验证是否登陆
export function isLogin(name) {
    let cookie = Cookies.get('MUSIC_U');
    // ''('cookie =>', cookie);
    //无cookie未登陆
    if (!cookie) return false;
    //有cookie已登陆
    return true;
}


