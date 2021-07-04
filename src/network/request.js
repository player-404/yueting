import axios from 'axios';
import Cookies from 'js-cookie';

export default function request(config) {
    const instance = axios.create({
        baseURL: 'http://47.95.218.187:3000',
        withCredentials: true
    })

    //请求拦截器
    instance.interceptors.request.use((config) => {
        // ''(config);
        //在请求数据之前需要做什么
        const cookie = Cookies.get('MUSIC_U');
        if (!config.params) config.params = {};
        //请求发送cookie
        if (cookie) {
            config.params.cookie = `MUSIC_U=${cookie}`;
        }
        return config;
    }, (err) => {
        return Promise.reject(err);
    })
    return instance(config)
}