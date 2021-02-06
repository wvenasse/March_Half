import request from "@/utils/request";

export function ShowAllFavor(data){
    return request.request({
        method: "get",
        url: "/showAllFavor",
        params: data
    })
}

export function FindAllFavor(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllFavor",
        data: qs.stringify(data)
    })
}

export function UpdateFavor(data){
    return request.request({
        method: "get",
        url: "/updateFavor",
        params: data
    })
}

export function AddFavor(data){
    return request.request({
        method: "get",
        url: "/addFavor",
        params: data
    })
}

export function DelFavor(data){
    return request.request({
        method: "get",
        url: "/delFavor",
        params: data
    })
}