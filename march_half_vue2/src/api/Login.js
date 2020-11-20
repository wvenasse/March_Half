import request from "@/utils/request";

export function Login(data){
    var qs = require('querystring');
    return request.request({
        method:"post",
        url:"login",
        data: qs.stringify(data)
    })
}

export function ShowUser(data){
    return request.request({
        method: "get",
        url: "/showUser",
        params: data
    })
}
