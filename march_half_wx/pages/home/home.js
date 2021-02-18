// pages/home/home.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice:[],
    active: 'institution',
    institution:[],
    service:[]
  },

  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  loadNotice(){
    var that = this;
    let data;
    util.baseGet('http://localhost:8088/showAllNotice',data,
      function (result) {
        console.log(result);
        for (let i=0;i<result.data.length;i++) {
          result.data[i].noticeImg = '../image/'+result.data[i].noticeImg;
        }
        that.setData({
          notice: result.data
        })
      },function (err) {
        console.log(err);
      })
  },
  loadInstitution(){
    var that = this;
    let data;
    util.baseGet('http://localhost:8088/showAllInstitution',data,
      function (result) {
        console.log(result);
        for (let i=0;i<result.data.length;i++) {
          result.data[i].institutionImg = '../image/'+result.data[i].institutionImg.split(',')[0];
        }
        that.setData({
          institution: result.data
        })
      },function (err) {
        console.log(err);
      })
  },
  loadService(){
    var that = this;
    let data;
    util.baseGet('http://localhost:8088/showAllInstitution',data,
      function (result) {
        console.log(result);
        that.setData({
          service: result.data
        })
      },function (err) {
        console.log(err);
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadNotice();
    this.loadInstitution();
    this.loadService();
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