// pages/home/home.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice:[],
    post:[],
    active: 'institution',
    institution:[],
    service:[],
    type:[],
    icons:[
      't-icon-bangdaiyongyi',
      't-icon-yingerfu',
      't-icon-beixin',
      't-icon-baozhen',
      't-icon-maoyi',
      't-icon-weiyi',
      't-icon-gaolingmaoyi',
      't-icon-yashemao',
      't-icon-shishi',
      't-icon-lvhangbao',
      't-icon-danjianbao',
      't-icon-diannaobao',
      't-icon-chajianTxu',
      't-icon-fentiyongyi',
      't-icon-hanglixiang',
      't-icon-lianshenyongyi',
      't-icon-shoutibao',
      't-icon-taolingshangyi',
      't-icon-gengduo',
    ]
  },
  async init () {
    await util.showLoading() // 显示loading
    await Promise.all([this.loadNotice(), this.loadInstitution(), this.loadService(), this.loadType(), this.loadPost()]); // 请求数据
    await util.hideLoading() // 等待请求数据成功后，隐藏loading
  },
  loadNotice(){
    var that = this;
    let data;
    return new Promise((resolve, reject) => {
      util.getData('showAllNotice', data).then((res) => {
        for (let i=0;i<res.length;i++) {
          res[i].noticeImg = util.imageUrl(res[i].noticeImg)
        }
        this.setData({
          notice: res
        })
        console.log(res)
        resolve()
      })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  },
  loadInstitution(){
    var that = this;
    let data;
    return new Promise((resolve, reject) => {
      util.getData('showAllInstitution', data).then((res) => {
        for (let i=0;i<res.length;i++) {
          res[i].institutionImg = util.imageUrl(res[i].institutionImg.split(',')[0]);
        }
        this.setData({
          institution: res
        })
        console.log(res)
        resolve()
      })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  },
  loadService(){
    var that = this;
    let data;
    return new Promise((resolve, reject) => {
      util.getData('showAllGoodService', data).then((res) => {
        for (let i=0;i<res.length;i++) {
          res[i].serviceIcon = util.imageUrl(res[i].serviceIcon.split(',')[0]);
        }
        this.setData({
          service: res
        })
        console.log(res)
        resolve()
      })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  },
  loadType(){
    var that = this;
    let data;
    return new Promise((resolve, reject) => {
      util.getData('showAllType', data).then((res) => {
        var newType = [];
        for (let i=0;i<7;i++) {
          newType.push(res[i])
        }
        this.setData({
          type: newType
        })
        console.log(res)
        resolve()
      })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  },
  loadPost(){
    var that = this;
    let data;
    return new Promise((resolve, reject) => {
      util.getData('showAllPost', data).then((res) => {
        var newPost = [];
        for (let i=0;i<3;i++) {
          newPost.push(res[i])
        }
        this.setData({
          post: newPost
        })
        console.log(res)
        resolve()
      })
        .catch((err) => {
          console.error(err)
          reject(err)
        })
    })
  },

  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
  },
  gotoAllType() {
    wx.navigateTo({
      url: '../allType/allType'
    })
  },
  gotoType(e){
    let type = e.currentTarget.dataset['type'];
    wx.navigateTo({
      url: '../typeList/typeList?typeId='+type.typeId+'&typeName='+type.typeName
    })
  },
  gotoPost(e){
    wx.navigateTo({
      url: '../post/post'
    })
  },
  gotoInstitution(e){
    let institution = e.currentTarget.dataset['institution'];
    wx.navigateTo({
      url: '../institution/institution?institutionId='+institution.institutionId+'&institutionName='+institution.institutionName
    })
  },
  gotoService(e){
    let service = e.currentTarget.dataset['service'];
    wx.navigateTo({
      url: '../service/service?serviceId='+service.serviceId+'&serviceName='+service.serviceName
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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