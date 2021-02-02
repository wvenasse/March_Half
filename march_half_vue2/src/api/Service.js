import request from "@/utils/request";


export function FindAllService(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllService",
        data: qs.stringify(data)
    })
}

export function UpdateService(data){
    return request.request({
        method: "get",
        url: "/updateService",
        params: data
    })
}

export function AddService(data){
    return request.request({
        method: "get",
        url: "/addService",
        params: data
    })
}

export function DelService(data){
    return request.request({
        method: "get",
        url: "/delService",
        params: data
    })
}