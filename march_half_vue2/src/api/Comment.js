import request from "@/utils/request";

export function ShowAllComment() {
    return request.request({
        method: "get",
        url: "/showAllComment"
    })
}

export function ShowAllCommentByUser(data) {
    return request.request({
        method: "get",
        url: "/showAllCommentByUser",
        params: data
    })
}

export function ShowAllCommentByPost(data) {
    return request.request({
        method: "get",
        url: "/showAllCommentByPost",
        params: data
    })
}

export function ShowAllCommentFirst(data) {
    return request.request({
        method: "get",
        url: "/showAllCommentFirst",
        params: data
    })
}

export function ShowAllCommentSecond(data) {
    return request.request({
        method: "get",
        url: "/showAllCommentSecond",
        params: data
    })
}

export function FindAllComment(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllComment",
        data: qs.stringify(data)
    })
}

export function FindAllCommentFirst(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllCommentFirst",
        data: qs.stringify(data)
    })
}

export function FindAllCommentSecond(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllCommentSecond",
        data: qs.stringify(data)
    })
}

export function ShowComment(data){
    return request.request({
        method: "get",
        url: "/showComment",
        params: data
    })
}

export function UpdateComment(data){
    return request.request({
        method: "get",
        url: "/updateComment",
        params: data
    })
}

export function UpdateCommentNum(data){
    return request.request({
        method: "get",
        url: "/updateCommentNum",
        params: data
    })
}

export function AddComment(data){
    return request.request({
        method: "get",
        url: "/addComment",
        params: data
    })
}

export function DelComment(data){
    return request.request({
        method: "get",
        url: "/delComment",
        params: data
    })
}