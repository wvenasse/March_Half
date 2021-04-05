// pages/forum/forum.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    ],
    orderList:[],
    orderStatus:0,
    isShowTip:false,
    tipTetx:'',
    isShowDelete:false,
    currentOrder:{},
    identity: wx.getStorageSync('identity')||'user'
  },
  onClickStatus(event) {
    let index = event.detail.index;
    let status;
    if (index === 0) {
      status=0;
    }
    else if (index === 1) {
      status=1;
    }
    else if (index === 2) {
      status=2;
    }
    else if (index === 3) {
      status=3;
    }
    else if (index === 4) {
      status=4;
    }
    this.setData({
      orderStatus:status
    })
    wx.setStorageSync('orderStatus',status)
    this.loadOrder();
  },
  loadOrder(){
    var that = this;
    let data={
      orderStatus: wx.getStorageSync('orderStatus') || this.data.orderStatus
    };
    let url
    if (wx.getStorageSync('identity') == 'user') {
      url = 'showAllOrderByStatus';
      data['userId'] = wx.getStorageSync('userDetail').userId;
    }
    else if (wx.getStorageSync('identity') == 'service') {
      url = 'showAllOrderByServiceStatus';
      data['serviceId'] = wx.getStorageSync('userDetail').serviceId;
    }
    util.baseGet(url,data,
      function (result) {
        console.log(result);
        for (let i=0;i<result.data.length;i++) {
          result.data[i].date =  Math.round(((Date.parse(new Date(result.data[i].orderEndDate)))/1000-(Date.parse(new Date(result.data[i].orderStartDate)))/1000)/60/60);
          result.data[i].serviceImg = util.imageUrl(result.data[i].serviceImg.split(',')[0]);
        }
        that.setData({
          orderList: result.data.reverse()
        })
      },function (err) {
        console.log(err);
      })
  },
  gotoOrderDetail(e){
    let order = e.currentTarget.dataset['order'];
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderId='+order.orderId
    })
  },
  editOrder(e){
    let order = e.currentTarget.dataset['order'];
    wx.navigateTo({
      url: '../subscribe/subscribe?orderId='+order.orderId
    })
  },
  openTip(e){
    let order = e.currentTarget.dataset['order'];
    let text;
    if (this.data.identity == 'user') {
      text = '确定该订单已完成吗？';
    }
    else {
      if (order.orderStatus == '0') {
        text = '是否确定接单？';
      }
      else if (order.orderStatus == '1') {
        text = '是否确定开始？';
      }
      else if (order.orderStatus == '2') {
        text = '是否确定已完成？';
      }
    }
    this.setData({
      isShowTip: true,
      currentOrder:order,
      tipTetx: text
    })
  },
  closeTip(){
    this.setData({
      isShowTip: false
    })
  },
  updateOrderStatus(){
    let order = this.data.currentOrder;
    var that = this;
    let status;
    if (order.orderStatus == '0') {
      status = '1'
    }
    else if (order.orderStatus == '1') {
      status = '2'
    }
    else if (order.orderStatus == '2') {
      status = '3'
    }
    let data={
      orderId: order.orderId,
      orderStatus: status
    };
    util.baseGet('updateOrderStatus',data,
      function (result) {
        console.log(result);
        that.loadOrder();
        that.setData({
          isShowTip: false
        })
      },function (err) {
        console.log(err);
      })
  },
  openDetele(e){
    let order = e.currentTarget.dataset['order'];
    this.setData({
      isShowDelete: true,
      currentOrder:order
    })
  },
  closeDelete(){
    this.setData({
      isShowDelete: false
    })
  },
  deleteOrder(){
    let order = this.data.currentOrder;
    var that = this;
    let data={
      orderId: order.orderId
    };
    util.baseGet('delOrder',data,
      function (result) {
        console.log(result);
        that.loadOrder();
        that.setData({
          isShowDelete: false
        })
        that.updateUserOrderNum();
      },function (err) {
        console.log(err);
      })
  },
  openEvaluation(e){
    let order = e.currentTarget.dataset['order'];
    wx.navigateTo({
      url: '../send-evaluation/send-evaluation?orderId='+order.orderId+'&flag='+1
    })
  },
  editEvaluation(e) {
    let order = e.currentTarget.dataset['order'];
    wx.navigateTo({
      url: '../send-evaluation/send-evaluation?orderId='+order.orderId+'&flag='+2
    })
  },


  updateUserOrderNum() {
    var that = this;
    let data = {
      userId: wx.getStorageSync('userDetail').userId
    };
    util.baseGet('updateUserOrderNum', data,
      function (result) {
        console.log(result);
      },
      function (err) {
        console.log(err);
      })
  },
  updateServiceOrderNum() {
    var that = this;
    let data = {
      serviceId: this.currentOrder.serviceId
    };
    util.baseGet('updateServiceOrderNum', data,
      function (result) {
        console.log(result);
      },
      function (err) {
        console.log(err);
      })
  },
  updateInstitutionOrderNum() {
    var that = this;
    let data = {
      institutionId: this.currentOrder.institutionId
    };
    util.baseGet('updateInstitutionOrderNum', data,
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
    this.loadOrder();
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
    this.onLoad();
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