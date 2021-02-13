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

export function FindAllPostByUser(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllPostByUser",
        data: qs.stringify(data)
    })
}

export function FindAllPostByType(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllPostByType",
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

export function UpdatePostTop(data){
    return request.request({
        method: "get",
        url: "/updatePostTop",
        params: data
    })
}

export function UpdatePostPop(data){
    return request.request({
        method: "get",
        url: "/updatePostPop",
        params: data
    })
}

export function UpdatePostLikeNum(data){
    return request.request({
        method: "get",
        url: "/updatePostLikeNum",
        params: data
    })
}

export function UpdatePostLoveNum(data){
    return request.request({
        method: "get",
        url: "/updatePostLoveNum",
        params: data
    })
}

export function UpdatePostComNum(data){
    return request.request({
        method: "get",
        url: "/updatePostComNum",
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