import request from "@/utils/request";

export function ShowAllUser(){
    return request.request({
        method: "get",
        url: "/showAllUsers"
    })
}

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
        url: "/updateUsers",
        params: data
    })
}

export function UpdateUserAddressNum(data){
    return request.request({
        method: "get",
        url: "/updateUserAddressNum",
        params: data
    })
}

export function UpdateUserLikeNum(data){
    return request.request({
        method: "get",
        url: "/updateUserLikeNum",
        params: data
    })
}

export function UpdateUserLoveNum(data){
    return request.request({
        method: "get",
        url: "/updateUserLoveNum",
        params: data
    })
}

export function UpdateUserOrderNum(data){
    return request.request({
        method: "get",
        url: "/updateUserOrderNum",
        params: data
    })
}

export function AddUser(data){
    return request.request({
        method: "get",
        url: "/addUsers",
        params: data
    })
}

export function DelUser(data){
    return request.request({
        method: "get",
        url: "/delUsers",
        params: data
    })
}