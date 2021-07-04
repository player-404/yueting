export function getCookie(strCookie) {
    let arr = strCookie.split(';;');
    let cookieObj = {};
    arr.forEach(item => {
        if (!!item) {
            let itemArr = item.split('=');
            cookieObj[itemArr[0].trim()] = itemArr[1];
        }
    });
    return arr;
}

export function setCookie(cookie) {
    cookie.forEach(item => {
        document.cookie = item;
    })

}
//获取cookie过期时间
export function expiresTime(cookie) {
    let cookieArr = cookie.split(';;');
    let firstCookie = cookieArr[0];
    let cookies = firstCookie.split(';');
    let c = cookies.slice(1, cookies.length - 1);
    let obj = {};
    c.forEach(item => {
        const i = item.split('=');
        obj[i[0]] = i[1];
    })
    return obj;
}