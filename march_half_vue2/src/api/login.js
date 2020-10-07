import request from "@/utils/request";
import { Message } from 'element-ui';

// 获取验证码
export function Login(data) {
  request.request({
      method: "get",
      url: "/login",
      params: data
    })
    .then(function(response) {
      console.log(response);
      Message.success(response.data.msg);
    })
    .catch(function (error) {
        console.log(error);
    });

}
export function ShowUser(data) {
  request
    .request({
      method: "get",
      url: "/showUser",
      params: data
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

}
export function AddUser(data) {
  request.request({
    method: "get",
    url: "/addUser",
    params: data
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function (error) {
      console.log(error);
  });
}

