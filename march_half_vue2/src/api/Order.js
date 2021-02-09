import request from "@/utils/request";

export function ShowAllOrder() {
    return request.request({
        method: "get",
        url: "/showAllOrder"
    })
}

export function ShowAllOrderByStatus(data) {
    return request.request({
        method: "get",
        url: "/showAllOrderByStatus",
        params: data
    })
}

export function FindAllOrder(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllOrder",
        data: qs.stringify(data)
    })
}

export function FindAllOrderByStatus(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllOrderByStatus",
        data: qs.stringify(data)
    })
}

export function UpdateOrder(data){
    return request.request({
        method: "get",
        url: "/updateOrder",
        params: data
    })
}

export function UpdateOrderStatus(data){
    return request.request({
        method: "get",
        url: "/updateOrderStatus",
        params: data
    })
}

export function AddOrder(data){
    return request.request({
        method: "get",
        url: "/addOrder",
        params: data
    })
}

export function DelOrder(data){
    return request.request({
        method: "get",
        url: "/delOrder",
        params: data
    })
}