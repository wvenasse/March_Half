const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/*
 * post网络请求 
 * @param string | object 请求地址
 * @param object data POST请求数组
 * @param callable successCallback 成功执行方法
 * @param callable errorCallback 失败执行方法
 */
const basePost = function (url, data, successCallback, errorCallback, header) {
  console.log('请求url：' + url);
  wx.showLoading({
    title: "正在加载中...",
  })
  wx.request({
    url: url,
    data: data,
    dataType: 'json',
    method: 'POST',
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      wx.hideLoading();
      console.log('响应：', res.data);
      try {
        if (res.data.code == 200) {
          successCallback && successCallback(res.data);
        } else {
          if (res.data.code == 402) getApp().globalData.token = '', getApp().globalData.isLog = false;
          //返回状态为401时,用户被禁止访问 关闭当前所有页面跳转至用户禁止登录页面
          if (res.data.code == 401) return Tips({
            title: res.data.msg
          });
          errorCallback && errorCallback(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    fail: function (res) {
      errorCallback && errorCallback(res);
    },
    complete: function (res) {

    }
  });
}
/*
 * get网络请求 
 * @param string | object 请求地址
 * @param callable successCallback 成功执行方法
 * @param callable errorCallback 失败执行方法
 * @param boolean isMsg 是否自动提示错误 默认提示
 */
const baseGet = function (url, data, successCallback, errorCallback, isMsg, header) {
  // wx.showLoading({
  //   title: "正在加载中...",
  // })
  wx.request({
    url: url,
    data: data,
    dataType: 'json',
    method: 'GET',
    header: header,
    success: function (res) {
      // wx.hideLoading();
      try {
        if (res.statusCode == 200) {
          successCallback && successCallback(res);
        } else {
          if (res.data.code == 402) getApp().globalData.token = '', getApp().globalData.isLog = false;
          //返回状态为401时,用户被禁止访问 关闭当前所有页面跳转至用户禁止登录页面
          // if (res.data.code == 401) return Tips({
          //   title: res.data.msg
          // });
          // errorCallback && errorCallback(res.data);
          // isMsg || Tips({
          //   title: res.data.msg
          // });
        }
      } catch (e) {
        console.log(e);
      }
    },
    fail: function (res) {
      console.log('submit fail');
    },
    complete: function (res) {

    }
  });
}

/*
 * 合并数组
 */
const SplitArray = function (list, sp) {
  if (typeof list != 'object') return [];
  if (sp === undefined) sp = [];
  for (var i = 0; i < list.length; i++) {
    sp.push(list[i]);
  }
  return sp;
}

module.exports = {
  formatTime: formatTime,
  basePost:basePost,
  baseGet:baseGet,
  SplitArray:SplitArray
}
