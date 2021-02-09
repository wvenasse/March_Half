import request from "@/utils/request";

export function ShowAllEvaluation() {
    return request.request({
        method: "get",
        url: "/showAllEvaluation"
    })
}

export function ShowAllEvaluationByUser(data) {
    return request.request({
        method: "get",
        url: "/showAllEvaluationByUser",
        params: data
    })
}

export function ShowAllEvaluationByModel(data) {
    return request.request({
        method: "get",
        url: "/showAllEvaluationByModel",
        params: data
    })
}

export function FindAllEvaluation(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllEvaluation",
        data: qs.stringify(data)
    })
}

export function FindAllEvaluationByUser(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllEvaluationByUser",
        data: qs.stringify(data)
    })
}

export function FindAllEvaluationByModel(data){
    var qs = require('querystring');
    return request.request({
        method: "post",
        url: "/findAllEvaluationByModel",
        data: qs.stringify(data)
    })
}

export function UpdateEvaluation(data){
    return request.request({
        method: "get",
        url: "/updateEvaluation",
        params: data
    })
}

export function AddEvaluation(data){
    return request.request({
        method: "get",
        url: "/addEvaluation",
        params: data
    })
}

export function DelEvaluation(data){
    return request.request({
        method: "get",
        url: "/delEvaluation",
        params: data
    })
}