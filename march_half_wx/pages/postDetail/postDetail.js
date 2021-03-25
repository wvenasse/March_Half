// pages/postDetail/postDetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId:0,
    postName:'',
    post:{}
  },
  loadPost(){
    var that = this;
    let data = {
      postId: this.data.postId
    };
    util.baseGet('showPost', data,
      function (result) {
        console.log(result);
        that.setData({
          post: result.data
        })
      },
      function (err) {
        console.log(err);
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
            that.updateServiceLikeNum();
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
            that.updateServiceLoveNum();
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
  updatePostLikeNum() {
    var that = this;
    let data = {
      postId: this.data.postId
    };
    util.baseGet('updatePostLikeNum', data,
      function (result) {
        console.log(result);
      },
      function (err) {
        console.log(err);
      })
  },
  updatePostLoveNum() {
    var that = this;
    let data = {
      postId: this.data.postId
    };
    util.baseGet('updatePostLoveNum', data,
      function (result) {
        console.log(result);
      },
      function (err) {
        console.log(err);
      })
  },
  
  updateUserComNum() {
    var that = this;
    let data = {
      userId: wx.getStorageSync('userDetail').userId
    };
    util.baseGet('updateUserComNum', data,
      function (result) {
        console.log(result);
      },
      function (err) {
        console.log(err);
      })
  },
  updatePostComNum() {
    var that = this;
    let data = {
      postId: this.data.postId
    };
    util.baseGet('updatePostComNum', data,
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
      postId: 1,//options.postId,
      postName:  'ssfdsfadgf'//options.postName,
    })
    wx.setNavigationBarTitle({
      title: this.data.postName
    })
    this.loadPost();
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