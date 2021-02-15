// pages/login/login.js
import city from '../../utils/city/city'
const app = getApp()
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
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },

  loadUsers(openid){
    var that = this;
    wx.request({
      url:'http://localhost:8088/showUsers',
      data:{
        openid:openid
      },
      success: (result) => {
        console.log(result);
        if (result.data) {
          that.setData({
            users:result.data
          })
        }
        else {
          //新增
          that.setData({
            flag:true
          })
        }
      },
    })
  },

  userNameinput(e) {
    var userName = 'users.userName'
    this.setData({
      [userName]: e.detail.value
    })
  },
  nickNameinput(e) {
    var nickName = 'users.nickName'
    this.setData({
      [nickName]: e.detail.value
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
  userAreainput(e) {
    var userArea = 'users.userArea'
    this.setData({
      [userArea]: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  submit: function (options) {
    var data = {
      openid: app.globalData.openid,
      nickName: this.data.users.nickName,
      userName: this.data.users.userName,
      userIcon: app.globalData.openid,
      userSfz: this.data.users.userSfz,
      userPhone: this.data.users.userPhone,
      userTime: this.data.users.userTime,
      userArea: this.data.users.userArea,
    }
    console.log(data);
    // if (this.data.flag) {
    //   wx.request({
    //     url: 'http://localhost:8088/addUsers',
    //     data: {
    //       openid: app.globalData.openid,
    //       nickName: this.data.users.nickName,
    //       userName: this.data.users.userName,
    //       userIcon: app.globalData.openid,
    //       userSfz: this.data.users.userSfz,
    //       userPhone: this.data.users.userPhone,
    //       userTime: this.data.users.userTime,
    //       userArea: this.data.users.userArea,
    //     },
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     method: 'GET',
    //     dataType: 'json',
    //     responseType: 'text',
    //     success: (result) => {
    //       if (result.data == 'ok') {
    //         app.globalData.userDetail = this.data.users;
    //         wx.showToast({
    //           title: '绑定成功！'
    //         })
    //         wx.reLaunch({
    //           url: '../my/my',
    //           success: (result) => {
                
    //           },
    //           fail: () => {},
    //           complete: () => {}
    //         });
              
    //       }
    //     },
    //     fail: () => {},
    //     complete: () => {}
    //   });
    // }
    // else {
    //   wx.request({
    //     url: 'http://localhost:8088/updateUsers',
    //     data: {
    //       userId: this.data.users.nickName,
    //       openid: app.globalData.openid,
    //       nickName: this.data.users.nickName,
    //       userName: this.data.users.userName,
    //       userIcon: app.globalData.openid,
    //       userSfz: this.data.users.userSfz,
    //       userPhone: this.data.users.userPhone,
    //       userTime: this.data.users.userTime,
    //       userArea: this.data.users.userArea,
    //     },
    //     success: (result) => {
    //       if (result.data == 'ok') {
    //         app.globalData.userDetail = this.data.users;
    //         wx.showToast({
    //           title: '修改成功！'
    //         })
    //         wx.reLaunch({
    //           url: '../my/my',
    //         });
    //       }
    //     },
    //   })
    // }
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

  // login: function (options) {
  //   wx.request({
  //     url: 'http://localhost:8088/login',
  //     data: {
  //       userId: this.data.userId,
  //       password: this.data.password
  //     },
  //     header: {'content-type':'application/json'},
  //     method: 'GET',
  //     dataType: 'json',
  //     responseType: 'text',
  //     success: (result) => {
  //       if (result.data == 'ok') {
  //         wx.showToast({
  //           title:'登陆成功！'
  //         })
  //         wx.reLaunch({
  //           url: '../home/home',
  //           success: (result) => {

  //           },
  //           fail: () => {},
  //           complete: () => {}
  //         });

  //       }
  //       else {
  //         wx.showToast({
  //           title:'登陆失败！'
  //         })
  //       }
  //     },
  //     fail: () => {},
  //     complete: () => {}
  //   });
  // },