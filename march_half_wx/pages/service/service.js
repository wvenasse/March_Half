// pages/service/service.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceId:0,
    serviceName:'',
    service:{},
    evaluation:{},
  },
  
  loadService(){
    var that = this;
    let year = new Date().getFullYear()
    let data={
      serviceId: this.data.serviceId
    };
    util.baseGet('showService',data,
      function (result) {
        console.log(result);
        let syear = result.data.serviceSfz.slice(6,10);
        result.data.year = year-syear;
        result.data.serviceIcon = result.data.serviceIcon.split(',');
        for (let i=0;i<result.data.serviceIcon.length;i++) {
          result.data.serviceIcon[i] = '../image/' + result.data.serviceIcon[i];
        }
        that.setData({
          service: result.data
        })
        console.log(that.data.service.serviceIcon)
      },function (err) {
        console.log(err);
      })
  },
  loadEvaluation(){
    var that = this;
    let data={
      serviceId: this.data.serviceId
    };
    util.baseGet('showAllEvaluationByService',data,
      function (result) {
        console.log(result);
        for (let i=0;i<result.data.length;i++) {
          result.data[i].userIcon = '../image/' + result.data[i].userIcon;
          let imgs = result.data[i].evaluationImg.split(',');
          for (let j=0;j<imgs.length;j++) {
            imgs[j] =  '../image/' + imgs[j];
          }
          result.data[i].evaluationImg = imgs;
        }
        that.setData({
          evaluation: result.data
        })
      },function (err) {
        console.log(err);
      })
  },
  listToggle: function () {
    this.setData({
      showMore: !this.data.showMore
    })
  },
  gotoServiceIcon () {
    wx.navigateTo({
      url: '../images/images?icons='+this.data.service.serviceIcon
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      serviceId: 6,//options.serviceId,
      serviceName:  '呱呱呱呱呱'//options.serviceName,
    })
    wx.setNavigationBarTitle({
      title: this.data.serviceName + '的介绍'
    })
    this.loadService();
    this.loadEvaluation();

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