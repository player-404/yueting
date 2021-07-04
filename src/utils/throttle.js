export default function throttle(func, delay) {
    // console.log(123)
    let run = true;
    return function () {
        if (!run) return;
        run = false
        setTimeout(() => {
            func.apply(this, arguments);
            run = true;
        }, delay)
    }
}