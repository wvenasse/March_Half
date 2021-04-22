import request from "@/utils/request";

export function ShowAllPower(){
    return request.request({
        method: "get",
        url: "/showAllPower"
    })
}

export function FindAllPower(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllPower",
        data: qs.stringify(data)
    })
}

export function UpdatePower(data){
    return request.request({
        method: "get",
        url: "/updatePower",
        params: data
    })
}

export function AddPower(data){
    return request.request({
        method: "get",
        url: "/addPower",
        params: data
    })
}

export function DelPower(data){
    return request.request({
        method: "get",
        url: "/delPower",
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