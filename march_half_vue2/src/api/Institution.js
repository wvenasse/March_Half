import request from "@/utils/request";


export function FindAllInstitution(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllInstitution",
        data: qs.stringify(data)
    })
}

export function UpdateInstitution(data){
    return request.request({
        method: "get",
        url: "/updateInstitution",
        params: data
    })
}

export function AddInstitution(data){
    return request.request({
        method: "get",
        url: "/addInstitution",
        params: data
    })
}

export function DelInstitution(data){
    return request.request({
        method: "get",
        url: "/delInstitution",
        params: data
    })
}