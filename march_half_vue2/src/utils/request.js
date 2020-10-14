import axios from "axios";
import { Message } from 'element-ui';

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/api";

//创建
const service = axios.create({
  baseURL: BASEURL, //'http://localhost:8088'
  timeout: 1000
});

// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    let data = response.data;
    if (data.code) {
      if (data.code == 0) {
        Message.error(data.msg);
        return Promise.reject(data);
      }
      else {
        return response;
        // Promise.resolve
      }
    }
    
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
//default 默认
