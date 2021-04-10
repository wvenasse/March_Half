import request from "@/utils/request";

export function showAllInform(data) {
    return request.request({
        method: "get",
        url: "/showAllInform",
    })
}

export function FindAllInform(data) {
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllInform",
        data: qs.stringify(data)
    })
}

export function addInform(data) {
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/addInform",
        data: qs.stringify(data)
    })
}

export function updateInform(data) {
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/updateInform",
        data: qs.stringify(data)
    })
}

export function delInform(data) {
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/delInform",
        data: qs.stringify(data)
    })
}