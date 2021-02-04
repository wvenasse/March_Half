import request from "@/utils/request";

export function addImage(data) {
    return request.request({
        method: "post",
        url: "/uploadPic",
        dataType: 'json',
        data: data
    })
}