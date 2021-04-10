import cookie from "cookie_js";

const adminToKen = 'admin_token';
const rootId = '';
const nickNama = 'nickname';
const userName = 'userName';

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

export function updateNickName(value) {
    return cookie.set(nickNama,value);
}

export function removeNickName() {
    return cookie.remove(nickNama);
}

export function getUserName() {
    return cookie.get(userName);
}

export function setUserName(value) {
    return cookie.set(userName,value);
}

export function updateUserName(value) {
    return cookie.set(userName,value);
}

export function removeUserName() {
    return cookie.remove(userName);
}