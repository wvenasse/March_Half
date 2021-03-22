// pages/address/address.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    isShowTip:false
  },

  loadAddress(){
    var that = this;
    let data = {
      userId: wx.getStorageSync('userDetail').userId
    };
    util.baseGet('showAllAddress',data,
      function (result) {
        console.log(result);
        that.setData({
          address: result.data
        })
      },function (err) {
        console.log(err);
      })
  },
  gotoAddressDetail(e){
    let address = e.currentTarget.dataset['address'];
    if (address) {
      wx.navigateTo({
        url: '../addressDetail/addressDetail?addressId='+address.addressId
      })
    }
    else {
      wx.navigateTo({
        url: '../addressDetail/addressDetail'
      })
    }
  },
  openTip(){
    this.setData({
      isShowTip: true
    })
  },
  closeTip(){
    this.setData({
      isShowTip: false
    })
  },
  deleteAddress(e){
    let address = e.currentTarget.dataset['address'];
    var that = this;
    let data={
      addressId: address.addressId,
    };
    util.baseGet('delAddress',data,
      function (result) {
        console.log(result);
        if (result.data.code == 200) {
          that.setData({
            isShowTip: false
          })
          that.loadAddress();
        }
      },function (err) {
        console.log(err);
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadAddress();
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