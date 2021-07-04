const mutations = {
    //首页背景图
    activeImg(state, payload) {
        // ''('playLoad =>', payload);
        state.imgUrl = payload
    },
    //轮播图数据
    getSwiper(state, payload) {
        // ''('payLoad =>', payload);
        state.swiperData = payload;
    },

    //关闭底部导航栏的显示
    closeNav(state, payload) {
        // ''('playload =>', payload);
        state.show = payload;
    },

    //当前slide激活的index
    setCurrentIndex(state, payLoad) {
        state.currentIndex = payLoad
    },

    //派发刷新事件
    setRefresh(state, payLoad) {
        state.refresh = payLoad
    },

    //当前播放列表
    setPlaylist(state, payLoad) {
        const {
            playList
        } = payLoad;

        state.playList = playList;
        // ''(state.playList);
    },

    //当前播放歌曲index
    setMusicIndex(state, payLoad) {
        // ''('payload is', payLoad);
        const {
            musicIndex
        } = payLoad;
        state.musicIndex = musicIndex;
        // ''('musicIndex =>', state.musicIndex)
    },

    //播放界面是否显示
    setNormalPlay(state, payLoad) {
        state.normalPlay = payLoad;
    },

    //是否顺序播放
    setOriginal(state, payLoad) {
        // ''(payLoad);
        state.ordinal = payLoad;
    },

    //设置随机播放顺序
    setRandSongs(state, payLoad) {
        state.randomSongs = payLoad;
    },

    //设置随机播放id
    setRandomId(state, payLoad) {
        state.randomId = payLoad;
    },

    //顺序播放id
    setTracksId(state, payLoad) {
        //相同数据不设置
        if (JSON.stringify(state.tracksId) == JSON.stringify(payLoad)) {
            return;
        }
        console.log('payload', payLoad);
        state.tracksId = payLoad;
    },

    //设置当前播放歌曲
    setSongs(state, payLoad) {
        state.playSong = payLoad
    },

    //当前播放列表是否显示
    setListView(state, payLoad) {
        // ''('payLoad =>', payLoad);
        let {
            status,
            name,
            type
        } = payLoad;
        state.listShow.status = status;
        if (name) {
            state.listShow.name = name;
        }
        if (type === 0 || type === 1) {
            state.listShow.type = type;
        }
    },

    //设置登陆状态
    setLoginStatus(state, payLoad) {
        state.loginStatus = payLoad;
    },

    //设置user信息
    setUserInfo(state, payLoad) {
        state.userInfo = payLoad;
    },
    //设置我的页面歌单
    setMyMusic(state, payLoad) {
        // ''('like payLoad', payLoad);
        state.myMusic = payLoad;
    },
    //设置底部导航栏是否显示
    setBotNavShow(state, payLoad) {
        state.show = payLoad;
        // ''(state.show);
    },
    //设置随机index
    setRandIndex(state, payLoad) {
        state.randIndex = payLoad;
    }
}

export default mutations