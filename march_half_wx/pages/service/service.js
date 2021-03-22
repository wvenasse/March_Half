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
    ellipsis: true,
    isLike:false,
    isLove:false,
    likeNum:0,
    loveNum:0,
    likeId:0,
    loveId:0
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

  ellipsis: function () {  
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
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
  gotoEvaluation (e) {
    let evaluation = e.currentTarget.dataset['evaluation'];
    wx.navigateTo({
      url: '../evaluation/evaluation?evaluationId='+evaluation.evaluationId
    })
  },
  gotoSubscribe() {
    wx.navigateTo({
      url: '../subscribe/subscribe?serviceId='+this.data.serviceId
    })
  },

  loadLike(){
    var that = this;
    let loveData={
      favorType: 1,
      userId: wx.getStorageSync('userDetail').userId,
      serviceId: this.data.serviceId
    };
    util.baseGet('isFavorService',loveData,
      function (result) {
        console.log(result);
        that.setData({
          likeId:result.data.favorId
        })
        that.deleteLike();
      },function (err) {
        console.log(err);
      })
  },
  loadLove(){
    var that = this;
    let loveData={
      favorType: 2,
      userId: wx.getStorageSync('userDetail').userId,
      serviceId: this.data.serviceId
    };
    util.baseGet('isFavorService',loveData,
      function (result) {
        console.log(result);
        that.setData({
          loveId:result.data.favorId
        })
        that.deleteLove();
      },function (err) {
        console.log(err);
      })
  },
  loadLikeNum(){
    var that = this;
    let userId = wx.getStorageSync('userDetail').userId;
    let like = false;
    let likeData={
      favorType: 1,
      serviceId: this.data.serviceId
    };
    util.baseGet('isFavorServiceNum',likeData,
      function (result) {
        console.log(result);
        for (let i=0;i<result.data.length;i++) {
          if (result.data[i].userId == userId) {
            like = true;
            break;
          }
        }
        that.setData({
          isLike:like,
          likeNum:result.data.length
        })
      },function (err) {
        console.log(err);
      })
  },
  loadLoveNum(){
    var that = this;
    let userId = wx.getStorageSync('userDetail').userId;
    let love = false;
    let loveData={
      favorType: 2,
      serviceId: this.data.serviceId
    };
    util.baseGet('isFavorServiceNum',loveData,
      function (result) {
        console.log(result);
        for (let i=0;i<result.data.length;i++) {
          if (result.data[i].userId == userId) {
            love = true;
            break;
          }
        }
        that.setData({
          isLove:love,
          loveNum:result.data.length
        })
      },function (err) {
        console.log(err);
      })
  },
  onLikeChange(){
    let that = this;
    let Time = util.formatTime(new Date());
    if (this.data.isLike) {
      this.loadLike();
    }
    else {
      let data = {
        userId: wx.getStorageSync('userDetail').userId,
        favorType: 1,
        favorTime: Time,
        serviceId: this.data.serviceId,
        serviceName: this.data.serviceName
      };
      util.baseGet('addFavor',data,
        function (result) {
          console.log(result);
          if (result.data.code == 200) {
            that.loadLikeNum();
            that.updateUserLikeNum();
          }
        },function (err) {
          console.log(err);
        })
    }
  },
  onLoveChange(){
    let that = this;
    let Time = util.formatTime(new Date());
    if (this.data.isLove) {
      this.loadLove();
    }
    else {
      let data = {
        userId: wx.getStorageSync('userDetail').userId,
        favorType: 2,
        favorTime: Time,
        serviceId: this.data.serviceId,
        serviceName: this.data.serviceName
      };
      util.baseGet('addFavor',data,
        function (result) {
          console.log(result);
          if (result.data.code == 200) {
            that.loadLoveNum();
            that.updateUserLoveNum();
          }
        },function (err) {
          console.log(err);
        })
    }
  },
  deleteLike(){
    var that = this;
    let loveData={
      favorId: this.data.likeId
    };
    util.baseGet('delFavor',loveData,
      function (result) {
        console.log(result);
        if (result.data.code == 200) {
          that.loadLikeNum();
        }
      },function (err) {
        console.log(err);
      })
  },
  deleteLove(){
    var that = this;
    let loveData={
      favorId: this.data.loveId
    };
    util.baseGet('delFavor',loveData,
      function (result) {
        console.log(result);
        if (result.data.code == 200) {
          that.loadLoveNum();
        }
      },function (err) {
        console.log(err);
      })
  },

  updateUserLikeNum() {
    var that = this;
    let data = {
      userId: wx.getStorageSync('userDetail').userId
    };
    util.baseGet('updateUserLikeNum', data,
      function (result) {
        console.log(result);
      },
      function (err) {
        console.log(err);
      })
  },
  updateUserLoveNum() {
    var that = this;
    let data = {
      userId: wx.getStorageSync('userDetail').userId
    };
    util.baseGet('updateUserLoveNum', data,
      function (result) {
        console.log(result);
      },
      function (err) {
        console.log(err);
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      serviceId: options.serviceId,
      serviceName:  options.serviceName,
    })
    wx.setNavigationBarTitle({
      title: this.data.serviceName + '的介绍'
    })
    this.loadService();
    this.loadEvaluation();
    this.loadLikeNum();
    this.loadLoveNum();
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