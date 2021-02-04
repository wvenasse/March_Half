import request from "@/utils/request";

export function showAllNotice(data) {
    return request.request({
        method: "get",
        url: "/showAllNotice",
    })
}

export function FindAllNotice(data) {
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllNotice",
        data: qs.stringify(data)
    })
}

export function addNotice(data) {
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/addNotice",
        data: qs.stringify(data)
    })
}

export function updateNotice(data) {
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/updateNotice",
        data: qs.stringify(data)
    })
}

export function delNotice(data) {
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/delNotice",
        data: qs.stringify(data)
    })
}