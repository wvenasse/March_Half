// pages/login/login.js
import dormitory from '../../utils/dormitory'
const app = getApp()
Page({
  data: {
    users:{
      userId: '',
      userName: '',
      userType: '1',
      userDorm: '',
      userRoom: '',
      userBed: '',
    },
    flag:false,
    isPickerShow: false,
    isSelect: false,
    dormitoryList: [],
    picker_data: [],
  },

  loadUsers(openid){
    // console.log("开始查询"+openid);
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

  uidinput(e) {
    var userId = 'users.userId'
    this.setData({
      [userId]: e.detail.value
    })
  },
  unainput(e) {
    var userName = 'users.userName'
    this.setData({
      [userName]: e.detail.value
    })
  },
  typeChange(event) {
    var userType = 'users.userType'
    this.setData({
      [userType]: event.detail,
    });
  },
  sureCallBack(e) {
    var userDorm = 'users.userDorm'
    var userRoom = 'users.userRoom'
    var userBed = 'users.userBed'
    this.setData({
      isPickerShow: false,
      isSelect: true,
      [userDorm]: e.detail.choosedData[0].name,
      [userRoom]: e.detail.choosedData[1].name,
      [userBed]: e.detail.choosedData[2].name
    })
  },

  submit: function (options) {
    if (this.data.flag) {
      wx.request({
        url: 'http://localhost:8088/addUsers',
        data: {
          openid: app.globalData.openid,
          userId: this.data.users.userId,
          userName: this.data.users.userName,
          userDorm: this.data.users.userDorm,
          userRoom: this.data.users.userRoom,
          userBed: this.data.users.userBed,
          userType: this.data.users.userType,
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
            wx.reLaunch({
              url: '../my/my',
              success: (result) => {
                
              },
              fail: () => {},
              complete: () => {}
            });
              
          }
        },
        fail: () => {},
        complete: () => {}
      });
    }
    else {
      wx.request({
        url: 'http://localhost:8088/updateUsers',
        data: {
          openid: app.globalData.openid,
          userId: this.data.users.userId,
          userName: this.data.users.userName,
          userDorm: this.data.users.userDorm,
          userRoom: this.data.users.userRoom,
          userBed: this.data.users.userBed,
          userType: this.data.users.userType,
        },
        success: (result) => {
          if (result.data == 'ok') {
            wx.showToast({
              title: '修改成功！'
            })
            wx.reLaunch({
              url: '../my/my',
            });
          }
        },
      })
    }
  },

  showPicker: function () {
    this.setData({
      isPickerShow: true
    })
  },
  cancleCallBack() {
    this.setData({
      isPickerShow: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData);
    this.loadUsers('oMCYx5UNizsGtuEcnc4tVvTxiVNY');
    this.setData({
      dormitoryList: dormitory.dormitoryList,
    })
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