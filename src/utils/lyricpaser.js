export function lyricpaser(lyricStr) {
    if (lyricStr.length === 0) return [];
    let lyric = []
    let data = lyricStr.split('[');
    data.forEach((item, index) => {
        if (index === 0) return;
        let obj = {};
        let i = item.split(']');
        let text = i[1];
        //去除歌词回车
        text = text.replace(/[\r\n]/g, "")
        if (!text) return;
        // 去除时间回车
        let time = i[0].replace(/[\r\n]/g, "");
        // 去除时间空格
        time = time.replace(/\s*/g, "")
        let t = timePaser(time);
        obj.time = t;
        obj.text = text;
        lyric.push(obj);
    })
    return lyric;
}

function timePaser(t) {
    let time = t.split(':');
    let m = time[0];
    let s = time[1];
    let times = m * 60 * 1000 + s * 1000;
    return times;
}