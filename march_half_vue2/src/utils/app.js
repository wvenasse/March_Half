import cookie from "cookie_js";

const adminToKen = 'admin_token';
const nickNama = 'nickname';

export function getToken() {
    return cookie.get(adminToKen);
}

export function setToken(token) {
    return cookie.set(adminToKen,token);
}

export function removeToken() {
    return cookie.remove(adminToKen);
}

export function getNickName() {
    return cookie.get(nickNama);
}

export function setNickName(value) {
    return cookie.set(nickNama,value);
}

export function removeNickName() {
    return cookie.remove(nickNama);
}