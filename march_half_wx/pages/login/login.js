// pages/login/login.js
const app = getApp()
Page({
  data: {
    userId: '',
    userName: '',
    userType: '1',
    userDorm: '',
    userRoom: '',
    userBed: '',
    isShow: false,
    isSelect: false,
    listData: [{
        name: '慕贤1',
        id: 1,
        children: [{
            name: '101',
            id: 1101,
            children: [{
                name: '1',
                id: 11011
              },
              {
                name: '2',
                id: 11012
              },
              {
                name: '3',
                id: 11013
              },
              {
                name: '4',
                id: 11014
              }
            ]
          },
          {
            name: '117',
            id: 1117,
            children: [{
                name: '1',
                id: 11171
              },
              {
                name: '2',
                id: 11172
              },
              {
                name: '3',
                id: 11173
              },
              {
                name: '4',
                id: 11174
              }
            ]
          }
        ]
      },
      {
        name: '慕贤2',
        id: 2,
        children: [{
            name: '101',
            id: 2101,
            children: [{
                name: '1',
                id: 21011
              },
              {
                name: '2',
                id: 21012
              },
              {
                name: '3',
                id: 21013
              },
              {
                name: '4',
                id: 21014
              }
            ]
          },
          {
            name: '102',
            id: 2102,
            children: [{
                name: '1',
                id: 21021
              },
              {
                name: '2',
                id: 21022
              },
              {
                name: '3',
                id: 21023
              },
              {
                name: '4',
                id: 21024
              }
            ]
          }
        ]
      }
    ],
    picker_data: [],
  },

  uidinput(e) {
    this.setData({
      userId: e.detail.value
    })
  },
  unainput(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  typeChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  submit: function (options) {
    wx.request({
      url: 'http://localhost:8088/addUsers',
      data: {
        openid: app.globalData.openid,
        userId: this.data.userId,
        userName: this.data.userName,
        userDorm: this.data.userDorm,
        userRoom: this.data.userRoom,
        userBed: this.data.userBed,
        userType: this.data.userType,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        if (result.data == 'ok') {
          wx.showToast({
            title: '绑定成功！'
          })
        }
      },
      fail: () => {},
      complete: () => {}
    });

  },



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

  showPicker: function () {
    this.setData({
      isShow: true
    })
  },
  sureCallBack(e) {
    let data = e.detail;
    this.setData({
      isShow: false,
      isSelect: true,
      userDorm: e.detail.choosedData[0].name,
      userRoom: e.detail.choosedData[1].name,
      userBed: e.detail.choosedData[2].name
      // picker_data: JSON.stringify(e.detail.choosedData),
      // picker_index:JSON.stringify(e.detail.choosedIndexArr),
    })
  },
  cancleCallBack() {
    this.setData({
      isShow: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData);
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