import request from "@/utils/request";

export function ShowAllPost() {
    return request.request({
        method: "get",
        url: "/showAllPost"
    })
}

export function ShowAllPostByUser(data) {
    return request.request({
        method: "get",
        url: "/showAllPostByUser",
        params: data
    })
}

export function ShowAllPostByType(data) {
    return request.request({
        method: "get",
        url: "/showAllPostByType",
        params: data
    })
}

export function FindAllPost(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllPost",
        data: qs.stringify(data)
    })
}

export function ShowPost(data){
    return request.request({
        method: "get",
        url: "/showPost",
        params: data
    })
}

export function UpdatePost(data){
    return request.request({
        method: "get",
        url: "/updatePost",
        params: data
    })
}

export function AddPost(data){
    return request.request({
        method: "get",
        url: "/addPost",
        params: data
    })
}

export function DelPost(data){
    return request.request({
        method: "get",
        url: "/delPost",
        params: data
    })
}