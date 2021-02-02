import request from "@/utils/request";


export function FindAllUser(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllUser",
        data: qs.stringify(data)
    })
}

export function UpdateUser(data){
    return request.request({
        method: "get",
        url: "/updateUser",
        params: data
    })
}

export function AddUser(data){
    return request.request({
        method: "get",
        url: "/addUser",
        params: data
    })
}

export function DelUser(data){
    return request.request({
        method: "get",
        url: "/delUser",
        params: data
    })
}