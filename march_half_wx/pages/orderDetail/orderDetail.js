// pages/orderDetail/orderDetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
  },
  loadOrder(orderId){
    var that = this;
    let data={
      orderId: orderId,
    };
    util.baseGet('showOrder',data,
      function (result) {
        console.log(result);
        result.data.date =  Math.round(((Date.parse(new Date(result.data.orderEndDate)))/1000-(Date.parse(new Date(result.data.orderStartDate)))/1000)/60/60);
        result.data.serviceImg = '../image/'+result.data.serviceImg;
        that.setData({
          order: result.data
        })
      },function (err) {
        console.log(err);
      })
  },
  gotoService(e){
    wx.navigateTo({
      url: '../service/service?serviceId='+this.data.order.serviceId+'&serviceName='+this.data.order.orderService
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadOrder(options.orderId);
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