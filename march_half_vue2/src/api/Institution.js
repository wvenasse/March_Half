import request from "@/utils/request";

export function ShowAllInstitution(){
    return request.request({
        method: "get",
        url: "/showAllInstitution"
    })
}

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

export function UpdateInstitutionLikeNum(data){
    return request.request({
        method: "get",
        url: "/updateInstitutionLikeNum",
        params: data
    })
}

export function UpdateInstitutionLoveNum(data){
    return request.request({
        method: "get",
        url: "/updateInstitutionLoveNum",
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