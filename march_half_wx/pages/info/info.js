var util = require('../../utils/util.js');
const app = getApp();
Page({
  data: {
    users:{
      userId: '',
      openid:'',
      userName: '',
      nickName:'',
      userIcon:'',
      userSfz:'',
      userPhone:'',
      userArea:'',
    },
    flag:false,
    region: ['请选择现居地', '', ''],
    customItem: '全部'
  },

  loadUsers(openid){
    var that = this;
    let data = {
      openid:openid
    }
    util.baseGet('showUsers',data,
      function (result) {
        result.data.userArea = result.data.userArea.split('/');
        that.setData({
          users:result.data,
          region:result.data.userArea
        })
      },function (err) {
        console.log(err);
      })
  },

  userNameinput(e) {
    var userName = 'users.userName'
    this.setData({
      [userName]: e.detail.value
    })
  },
  userPhoneinput(e) {
    var userPhone = 'users.userPhone'
    this.setData({
      [userPhone]: e.detail.value
    })
  },
  userSfzinput(e) {
    var userSfz = 'users.userSfz'
    this.setData({
      [userSfz]: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    var userArea = 'users.userArea'
    this.setData({
      region: e.detail.value,
      [userArea]: e.detail.value
    })
  },

  submit: function () {
    var Time = util.formatTime(new Date());
    var data = {
      userId: this.data.users.userId,
      openid: app.globalData.openid,
      nickName: this.data.users.nickName,
      userName: this.data.users.userName,
      userIcon: app.globalData.userInfo.avatarUrl,
      userSfz: this.data.users.userSfz,
      userPhone: this.data.users.userPhone,
      userTime: Time,
      userArea: this.data.users.userArea.join('/'),
    }
    var that = this;
    util.baseGet('updateUsers',data,
      function (result) {
        app.globalData.userDetail = that.data.users;
            wx.showToast({
              title: '修改成功！'
            })
            wx.reLaunch({
              url: '../my/my',
            });
      },function (err) {
        console.log(err);
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData);
    console.log(options);
    this.loadUsers(options.openid);
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

  /**4
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