// pages/subscribe/subscribe.js
var util = require('../../utils/util.js');
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    serviceId:'',
    orderId:'',
    service: {},
    orderInfo: {
      orderName:'',
      orderDate:'',
      orderDetail:'',
      typeId:'',
      orderType:'',
      addressId:'',
      orderContactName:'',
      orderContactPhone:'',
      orderArea:'',
      orderAddressDetail:'',

      orderStartDate: '',
      orderEndDate: '',
      orderPrice:'',
      orderPriceTotal:'',
      serviceImg:'',
    },
    focus: false,
    address:[],
    isShowAddress:false,

    type:[],
    isShowType:false,

    dateTimeArray: null,
    startDateTime: null,
    endDateTime:null,
    startYear: 2000,
    endYear: 2050,

    noteMaxLen: 100,
    currentNoteLen: 0,
  },
  loadService(serviceId){
    let data={
      serviceId: serviceId
    };
    let that = this;
    util.baseGet('showService',data,
      function (result) {
        console.log(result);
        let service = result.data;
        service.typeId = service.typeId.split(',');
        service.serviceType = service.serviceType.split(',');
        let type = [];
        for (let i=0;i<service.typeId.length;i++) {
          let typeIndex = {};
          typeIndex['typeId'] = service.typeId[i];
          typeIndex['serviceType'] = service.serviceType[i];
          type.push(typeIndex);
        }
        that.setData({
          service: result.data,
          type: type
        })
      },function (err) {
        console.log(err);
      })
  },
  loadAddress(){
    var that = this;
    let data={
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
  loadOrder() {
    let data={
      orderId: this.data.orderId
    };
    let that = this;
    util.baseGet('showOrder',data,
      function (result) {
        console.log(result);
        that.setData({
          orderInfo: result.data,
          currentNoteLen: result.data.orderDetail.length
        })
        that.loadService(result.data.serviceId);
      },function (err) {
        console.log(err);
      })
  },

  onAddressOpen() {
    this.setData({ isShowAddress: true });
  },
  onAddressClose() {
    this.setData({ isShowAddress: false });
  },
  onAddressSelect(e) {
    let address = e.currentTarget.dataset['address'];
    console.log(address);
    var addressId = 'orderInfo.addressId';
    var orderContactName = 'orderInfo.orderContactName';
    var orderContactPhone = 'orderInfo.orderContactPhone';
    var orderArea = 'orderInfo.orderArea';
    var orderAddressDetail = 'orderInfo.orderAddressDetail';
    this.setData({ 
      [addressId]: address.addressId,
      [orderContactName]: address.contactName,
      [orderContactPhone]: address.contactPhone,
      [orderArea]: address.addressArea,
      [orderAddressDetail]: address.addressDetail,
      isShowAddress: false
    });
  },

  onTypeOpen() {
    this.setData({ isShowType: true });
  },
  onTypeClose() {
    this.setData({ isShowType: false });
  },
  onTypeSelect(e) {
    let type = e.currentTarget.dataset['type'];
    console.log(type);
    var typeId = 'orderInfo.typeId';
    var orderType = 'orderInfo.orderType';
    this.setData({ 
      [typeId]: type.typeId,
      [orderType]: type.serviceType,
      isShowType: false
    });
  },
  
  changeStartDateTime(e){
    this.setData({ startDateTime: e.detail.value });
  },
  changeStartDateTimeColumn(e){
    var orderStartDate = 'orderInfo.orderStartDate'
    var arr = this.data.startDateTime;
    var dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    var date =  dateArr[0][arr[0]]+'-'+dateArr[1][arr[1]]+'-'+dateArr[2][arr[2]]+' '+dateArr[3][arr[3]]+':'+dateArr[4][arr[4]]+':'+dateArr[5][arr[5]];
    console.log(date)
    this.setData({
      dateTimeArray: dateArr,
      startDateTime: arr,
      [orderStartDate]: date
    });
  },
  changeEndDateTime(e){
    this.setData({ startDateTime: e.detail.value });
  },
  changeEndDateTimeColumn(e){
    var orderEndDate = 'orderInfo.orderEndDate'
    var arr = this.data.endDateTime;
    var dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    var date =  dateArr[0][arr[0]]+'-'+dateArr[1][arr[1]]+'-'+dateArr[2][arr[2]]+' '+dateArr[3][arr[3]]+':'+dateArr[4][arr[4]]+':'+dateArr[5][arr[5]];
    console.log(date)
    this.setData({
      dateTimeArray: dateArr,
      endDateTime: arr,
      [orderEndDate]: date
    });
  },

  _input(event) {
    let value = event.detail.value;
    let len = parseInt(value.length);
    var orderDetail = 'orderInfo.orderDetail';
    this.setData({
        [orderDetail]: value,
        currentNoteLen:len
    })
  },

  submitOreder() {
    let Time = util.formatTime(new Date());
    let orderInfo = this.data.orderInfo;
    let service = this.data.service;
    let Name = orderInfo.orderContactName + ',' + orderInfo.orderType +
    ',' + service.serviceName + ',' + service.serviceInstitution + ',' +
    Time;
    let img;
    if (this.data.service.serviceIcon) {
      img = this.data.service.serviceIcon.split(',')[0];
    }
    let startTime = (Date.parse(new Date(orderInfo.orderStartDate)))/1000;
    let endTime = (Date.parse(new Date(orderInfo.orderEndDate)))/1000;
    let time = (endTime-startTime)/60/60;
    let total = Math.round(service.servicePrice * time);
    let data = {
      orderName: Name,
      orderStartDate: orderInfo.orderStartDate,
      orderEndDate: orderInfo.orderEndDate,
      orderPriceTotal: total,
      orderPrice: service.servicePrice,
      orderTime: Time,
      serviceImg: img,
      orderDetail: orderInfo.orderDetail,
      userId: wx.getStorageSync('userDetail').userId,
      orderUser: wx.getStorageSync('userDetail').userName,
      typeId: orderInfo.typeId,
      orderType: orderInfo.orderType,
      serviceId: service.serviceId,
      orderService: service.serviceName,
      institutionId: service.institutionId,
      orderInstitution: service.serviceInstitution,

      addressId: orderInfo.addressId,
      orderContactName: orderInfo.orderContactName,
      orderContactPhone: orderInfo.orderContactPhone,
      orderArea: orderInfo.orderArea,
      orderAddressDetail: orderInfo.orderAddressDetail,
    };
    let url;
    if (this.data.orderId) {
      url = 'updateOrder';
      data['orderId'] = this.data.orderId;
      data['orderStatus'] = orderInfo.orderStatus
    } else {
      url = 'addOrder';
      data['orderStatus'] = '0'
    }
    let that = this;
    util.baseGet(url, data,
      function (result) {
        console.log(result);
        if (result.data.code == 200) {
          that.updateUserOrderNum();
          that.updateServiceOrderNum();
          that.updateInstitutionOrderNum();
          wx.switchTab({ 
            url: '../order/order'
          }) 
        }
      },
      function (err) {
        console.log(err);
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
      serviceId: this.data.service.serviceId
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
      institutionId: this.data.service.institutionId
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
    let title;
    if (options.orderId) {
      title = '修改';
      wx.setNavigationBarTitle({
        title: title + '订单'
      })
      this.setData({
        orderId: options.orderId
      })
      this.loadOrder();
    } else if (options.serviceId) {
      title = '发布';
      wx.setNavigationBarTitle({
        title: title + '订单'
      })
      var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
      this.setData({
        serviceId: options.serviceId,
        startDateTime: obj.dateTime,
        endDateTime: obj.dateTime,
        dateTimeArray: obj.dateTimeArray
      });
      this.loadService(options.serviceId);
    }
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