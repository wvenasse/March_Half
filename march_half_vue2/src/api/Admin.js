import request from "@/utils/request";


export function FindAllAdmin(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllAdmin",
        data: qs.stringify(data)
    })
}

export function UpdateAdmin(data){
    return request.request({
        method: "get",
        url: "/updateUser",
        params: data
    })
}

export function AddAdmin(data){
    request.request({
        method: "get",
        url: "/addUser",
        params: data
    })
}

export function DelAdmin(data){
    return request.request({
        method: "get",
        url: "/delUser",
        params: data
    })
}