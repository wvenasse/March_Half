import request from '@/utils/request'

// 获取验证码
export function getSms(){
    request.request({
        method: 'post',
        url: '/getSms/',
        data: {}
    })
  //   .then(function (response) {
  //       console.log(response);
  //   })
  //   .catch(function (error) {
  //       console.log(error);
  //   });
}

// 获取用户角色

//登录

//注册