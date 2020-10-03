// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    password:''

  },
  uidinput (e) {
    this.setData({
      userId: e.detail.value
    })
  },
  pwdinput (e) {
    this.setData({
      password: e.detail.value
    })
  },
  login: function (options) {
    wx.request({
      url: 'http://localhost:8088/login',
      data: {
        userId: this.data.userId,
        password: this.data.password
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        if (result.data == 'ok') {
          wx.showToast({
            title:'登陆成功！'
          })
          wx.navigateTo({
            url: '../home/home',
            success: (result) => {
              
            },
            fail: () => {},
            complete: () => {}
          });
            
        }
        else {
          wx.showToast({
            title:'登陆失败！'
          })
        }
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

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