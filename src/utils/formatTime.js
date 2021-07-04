import {
    Math
} from "core-js";

export function formatTime(time) {
    let t = Math.trunc(time);
    let s = t % 60;
    let second = s < 10 ? `0${s}` : s;
    let m = Math.trunc(t / 60);
    let minute = m < 10 ? `0${m}` : m;

    return `${minute}:${second}`

}