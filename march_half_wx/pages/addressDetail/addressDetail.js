// pages/addressDetail/addressDetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      contactName: '',
      contactPhone: '',
      addressArea: '',
      addressDetail: '',
      addressName: ''
    },
    addressId: ''
  },

  loadAddress() {
    var that = this;
    let data = {
      addressId: this.data.addressId
    };
    util.baseGet('showAddress', data,
      function (result) {
        console.log(result);
        that.setData({
          address: result.data
        })
      },
      function (err) {
        console.log(err);
      })
  },
  onNameChange(event) {
    let contactName = "address.contactName"
    this.setData({
      [contactName]: event.detail
    });
  },
  onPhoneChange(event) {
    let contactPhone = "address.contactPhone"
    this.setData({
      [contactPhone]: event.detail
    });
  },
  onChangeAddress: function () {
    var that = this;
    let addressArea = "address.addressArea"
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          [addressArea]: res.address
        });
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },
  onDetailChange(event) {
    let addressDetail = "address.addressDetail"
    this.setData({
      [addressDetail]: event.detail
    });
  },
  submitAddress() {
    let address = this.data.address;
    var that = this;
    address.addressName = address.contactName + ',' + address.contactPhone + ',' + address.addressArea + ',' + address.addressDetail;
    let data = {
      userId: wx.getStorageSync('userDetail').userId,
      contactName: address.contactName,
      contactPhone: address.contactPhone,
      addressArea: address.addressArea,
      addressDetail: address.addressDetail,
      addressName: address.addressName
    };
    let url;
    if (this.data.addressId) {
      url = 'updateAddress';
      data['addressId'] = this.data.addressId
    } else {
      url = 'addAddress';
    }
    console.log(data)
    util.baseGet(url,data,
      function (result) {
        console.log(result);
        if (result.data.code == 200) {
          that.updateUserAddressNum();
          wx.navigateTo({
            url: '../address/address'
          })
        }
      },function (err) {
        console.log(err);
      })
  },
  updateUserAddressNum() {
    var that = this;
    let data = {
      userId: wx.getStorageSync('userDetail').userId
    };
    util.baseGet('updateUserAddressNum', data,
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
    if (options.addressId) {
      title = '编辑';
      wx.setNavigationBarTitle({
        title: title + '地址'
      })
      this.setData({
        addressId: options.addressId
      })
      this.loadAddress();
    } else {
      title = '新增';
      wx.setNavigationBarTitle({
        title: title + '地址'
      })
    }

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