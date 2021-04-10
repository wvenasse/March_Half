// pages/favor/favor.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favor: [],
    favorType: 0,
    activeKey: 0,
    isShowTip: false,
    currentFavor:{}
  },
  loadFavor() {
    var that = this;
    let activeKey = this.data.activeKey;
    let data = {
      favorType: this.data.favorType,
      userId: wx.getStorageSync('userDetail').userId
    };
    util.baseGet('showAllFavor', data,
      function (result) {
        console.log(result);
        let newData;
        if (activeKey == 0) {
          newData = result.data.filter((favor) => {
            return favor.serviceId;
          });
        } else if (activeKey == 1) {
          newData = result.data.filter((favor) => {
            return favor.institutionId;
          });
        } else if (activeKey == 2) {
          newData = result.data.filter((favor) => {
            return favor.postId;
          });
        }
        that.setData({
          favor: newData
        })
      },
      function (err) {
        console.log(err);
      })
  },
  onTypeChange(event) {
    this.setData({
      activeKey: event.detail
    })
    this.loadFavor();
  },
  onFavorClick(event) {
    let favor = event.currentTarget.dataset.favor;
    let activeKey = this.data.activeKey;
    if (activeKey == 0) {
      wx.navigateTo({
        url: '../service/service?serviceId=' + favor.serviceId
      })
    } else if (activeKey == 1) {
      wx.navigateTo({
        url: '../institution/institution?institutionId=' + favor.institutionId
      })
    } else if (activeKey == 2) {
      console.log('post')
      wx.navigateTo({
        url: '../postDetail/postDetail?postId=' + favor.postId
      })
    }
  },
  openTip(e) {
    let favor = e.currentTarget.dataset.favor;
    this.setData({
      isShowTip: true,
      currentFavor:favor
    })
  },
  closeTip() {
    this.setData({
      isShowTip: false
    })
  },
  deleteFavor(e) {
    let favor = this.data.currentFavor;
    let favorType = this.data.favorType;
    var that = this;
    let data = {
      favorId: favor.favorId
    };
    util.baseGet('delFavor', data,
      function (result) {
        console.log(result);
        that.setData({
          isShowTip: false
        })
        that.loadFavor();
        if (result.data.code == 200 && favorType == 1) {
          that.updateUserLikeNum()
        } else if (result.data.code == 200 && favorType == 2) {
          that.updateUserLoveNum()
        }
        wx.showToast({
          title: '删除成功',
          icon: 'succes',
          duration: 1000,
          mask:true
        })
      },
      function (err) {
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
    if (options.favorType == 1) {
      wx.setNavigationBarTitle({
        title: '我的点赞'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '我的收藏'
      })
    }
    this.setData({
      favorType: options.favorType
    })
    this.loadFavor();
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