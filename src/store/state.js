const state = {
    //首页背景图
    imgUrl: null,
    //轮播图数据
    swiperData: null,
    show: true,
    //slideIndex
    currentIndex: null,
    //刷新
    refresh: false,
    //播放界面
    normalPlay: false,
    //顺序播放index
    musicIndex: 0,
    //随机播放index
    randIndex: 0,
    //是否随机播放 true随机 false顺序
    ordinal: true,
    //顺序播放id
    tracksId: null,
    //随机播放id
    randomId: null,
    //当前播放歌曲
    playSong: '',
    //当前播放是否显示
    listShow: {
        status: false,
        name: '',
        type: 0
    },
    //登陆状态
    loginStatus: false,
    userInfo: null,
    //我的音乐
    myMusic: null,
}

export default state