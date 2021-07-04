//随机获取数据
export default class GetRandom {
    constructor(data, length) {
        if (!Array.isArray(data)) {
            data = []
        }
        if (!typeof (length) == 'Number') {
            length = 0;
        }
        this.data = data
        this.length = length;
    }

    getData() {
        // ''('data =>', this.data, 'length =>', this.length);
        if (this.length <= 0) return [];
        const s = new Set([]);
        for (let i = 0; i < this.length; i++) {
            const index = Math.floor(Math.random() * this.data.length);
            const rand = JSON.stringify(this.data[index]);
            if (s.has(rand)) {
                i--;
                continue;
            }
            s.add(rand);
        }
        const arr = []
        for (let item of s.keys()) {
            arr.push(JSON.parse(item));
        }
        return arr;
    }
}