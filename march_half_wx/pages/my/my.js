// pages/my/my.js
import * as echarts from '../../utils/ec-canvas/echarts';
var util = require('../../utils/util.js');
const APP_ID = 'wx45c9758e3667e482'; //输入小程序appid  
const APP_SECRET = '4d0e2002773bb9c8a9db389f73297247'; //输入小程序app_secret  
var OPEN_ID = '' //储存获取到openid  
var SESSION_KEY = '' //储存获取到session_key
var CODE = ''
const app = getApp()
let chart = null;
var colors = ['#5793f3', '#d14a61', '#675bba'];
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color: colors,
    tooltip: {
        trigger: 'none',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data:['寝室分数', '个人分数']
    },
    grid: {
        top: 70,
        bottom: 50
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[1]
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return '分数  ' + params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: ['第1周','第2周','第3周','第4周','第5周','第6周','第7周','第8周']
        },
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[0]
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return '分数  ' + params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: ['第1周','第2周','第3周','第4周','第5周','第6周','第7周','第8周']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '寝室分数',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: [80,85,85,80,85,85,80,80]
        },
        {
            name: '个人分数',
            type: 'line',
            smooth: true,
            data: [82,83,88,81,85,85,84,82]
        }
    ]
  }
  chart.setOption(option);
  return chart;
}
Page({
  /**
   * 页面的初始数据
   */
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },
  data: {
    motto: 'Hello World',
    userInfo: {},
    userDetail:{},
    isAuth: true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ec: {
      onInit: initChart
    },
    
  },

  bindViewTap: function () {
    //跳转个人信息
    wx.navigateTo({
      url: '../info/info?openid=' + OPEN_ID
    })
  },
  getUserInfo: function (e) {
    //微信授权
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.getOpenIdTap();
    this.getCodeTap();
  },
  showUser: function (openid) {
    wx.request({
      url:'http://localhost:8088/showUsers',
      data:{
        openid:openid
      },
      success: (result) => {
        if (!result.data) {
          this.addUser();
        }
      },
    })
  },
  addUser: function (){
    var Time = util.formatTime(new Date());
    var data = {
      openid: app.globalData.userInfo.openid,
      nickName: app.globalData.userInfo.nickName,
      userName: '',
      userIcon: app.globalData.userInfo.avatarUrl,
      userSfz: '',
      userPhone: '',
      userTime: Time,
      userArea: '',
    }
    console.log(data);
      wx.request({
        url: 'http://localhost:8088/addUsers',
        data: data,
        header: {
          'content-type': 'application/json'
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          console.log(result)
          if (result.data == 'ok') {
            app.globalData.userDetail = this.data.users;
            wx.showToast({
              title: '绑定成功！'
            })
            wx.reLaunch({
              url: '../my/my',
              success: (result) => {
                
              },
              fail: () => {},
              complete: () => {}
            });
              
          }
        },
        fail: () => {},
        complete: () => {}
      });
  },
  getOpenIdTap: function () {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            OPEN_ID = res.data.openid; //获取到的openid  
            app.globalData.openid = res.data.openid;
            SESSION_KEY = res.data.session_key; //获取到session_key  
            app.globalData.session_key = res.data.session_key;
            // console.log(OPEN_ID.length)
            // console.log(SESSION_KEY.length)
            that.setData({
              openid: res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length),
              session_key: res.data.session_key.substr(0, 8) + '********' + res.data.session_key.substr(res.data.session_key.length - 6, res.data.session_key.length)
            })
            that.showUser(app.globalData.openid);
            that.loadUser(app.globalData.openid);
          }
        })
      }
    })
  },
  getCodeTap: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res.code)
        CODE = res.code;
        app.globalData.code = res.code;
      }
    })
  },
  loadUser(openid){
    var that = this;
    let data = {
      openid:openid
    }
    util.baseGet('http://localhost:8088/showUsers',data,
      function (result) {
        app.globalData.userDetail = result.data;
        console.log(app.globalData.userDetail);
        that.setData({
          userDetail: result.data
        })
      },function (err) {
        console.log(err);
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.getOpenIdTap();
      this.getCodeTap();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.getOpenIdTap();
        this.getCodeTap();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.getOpenIdTap();
          this.getCodeTap();
        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})



  // login: function (options) {
  //   wx.request({
  //     url: 'http://localhost:8088/login',
  //     data: {
  //       userId: this.data.userId,
  //       password: this.data.password
  //     },
  //     header: {'content-type':'application/json'},
  //     method: 'GET',
  //     dataType: 'json',
  //     responseType: 'text',
  //     success: (result) => {
  //       if (result.data == 'ok') {
  //         wx.showToast({
  //           title:'登陆成功！'
  //         })
  //         wx.reLaunch({
  //           url: '../home/home',
  //           success: (result) => {

  //           },
  //           fail: () => {},
  //           complete: () => {}
  //         });

  //       }
  //       else {
  //         wx.showToast({
  //           title:'登陆失败！'
  //         })
  //       }
  //     },
  //     fail: () => {},
  //     complete: () => {}
  //   });
  // },