import request from "@/utils/request";

export function ShowAllType(){
    return request.request({
        method: "get",
        url: "/showAllType"
    })
}

export function FindAllType(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllType",
        data: qs.stringify(data)
    })
}

export function UpdateType(data){
    return request.request({
        method: "get",
        url: "/updateType",
        params: data
    })
}

export function AddType(data){
    return request.request({
        method: "get",
        url: "/addType",
        params: data
    })
}

export function DelType(data){
    return request.request({
        method: "get",
        url: "/delType",
        params: data
    })
}

export function GetServiceById(data){
    return request.request({
        method: "get",
        url: "/showService",
        params: data
    })
}