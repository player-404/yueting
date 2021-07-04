const state = () => ({
    //当前歌曲信息
    currentItem: '',
    //歌词
    lyricStr: '',
    lyricIndex:'',
    //播放状态
    canPlay: false,
    //歌曲时长
    duration: '',
    //当前歌曲播放时间
    currentTime: '',
    //当前歌曲播放秒数
    currentSecond: '',
    //进度条拖动设置时间
    setSec: '',
    tipsBar: {
        status: false,
        message: true,
        successMsg: '',
        errorMsg: ''
    },
    //循环播放
    loop: false
})

export default state