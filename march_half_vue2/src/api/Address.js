import request from "@/utils/request";

export function ShowAllAddress(data){
    return request.request({
        method: "get",
        url: "/showAllAddress",
        params: data
    })
}

export function FindAllAddress(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllAddress",
        data: qs.stringify(data)
    })
}

export function UpdateAddress(data){
    return request.request({
        method: "get",
        url: "/updateAddress",
        params: data
    })
}

export function AddAddress(data){
    return request.request({
        method: "get",
        url: "/addAddress",
        params: data
    })
}

export function DelAddress(data){
    return request.request({
        method: "get",
        url: "/delAddress",
        params: data
    })
}