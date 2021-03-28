// pages/typeList/typeList.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
   data: {
    typeId:0,
    typeName:'',
    institutionId:0,
    rankOption: [
      { text: '默认排序', value: 'a' },
      { text: '时薪排序', value: 'b' },
      { text: '订单排序', value: 'c' },
    ],
    rankValue: 'a',
    switchTitle1: '服务区域',
    itemTitle: '筛选',
    region: ['请选择服务地区', '', ''],
    customItem: '全部',
    service:[]
  },

  loadService(){
    var that = this;
    let typeId = this.data.typeId;
    let data;
    if (this.data.rankValue == 'a') {
      data = {
        typeId : typeId,
        isPrice : 0,
        isOrder: 0
      }
    }
    else if (this.data.rankValue == 'b') {
      data = {
        typeId : typeId,
        isPrice : 1,
        isOrder: 0
      }
    }
    else if (this.data.rankValue == 'c') {
      data = {
        typeId : typeId,
        isPrice : 0,
        isOrder: 1
      }
    }
    util.baseGet('showAllServiceByType',data,
      function (result) {
        console.log(result);
        let institutionId = that.data.institutionId;
        for (let i=0;i<result.data.length;i++) {
          if (institutionId!==0 && result.data[i].institutionId !== institutionId) {
            result.data.splice(i,1);
            i--;
          }
          else {
            result.data[i].serviceIcon = util.imageUrl(result.data[i].serviceIcon.split(',')[0]);
          }
        }
        that.setData({
          service: result.data
        })
      },function (err) {
        console.log(err);
      })
  },

  onRankChange(e){
    this.setData({
      rankValue: e.detail,
    })
    this.loadService();
  },

  onConfirm() {
    let region = this.data.region[0]+'/'+this.data.region[1]+'/'+this.data.region[2];
    console.log(region);
    this.selectComponent('#item').toggle();
    var newService = this.data.service.filter(service=> service.serviceAddress == region)
    this.setData({
      service: newService
    })
    console.log(this.data.service)
  },

  gotoService(e){
    let service = e.currentTarget.dataset['service'];
    wx.navigateTo({
      url: '../service/service?serviceId='+service.serviceId+'&serviceName='+service.serviceName
    })
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      typeId: options.typeId,
      typeName: options.typeName,
      institutionId: options.institutionId? parseInt(options.institutionId):0,
    })
    wx.setNavigationBarTitle({
      title: this.data.typeName
    })
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