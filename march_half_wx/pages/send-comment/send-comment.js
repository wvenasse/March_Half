// pages/send-comment/send-comment.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentUser:'',
    commentId:'',
    postId:0,
    postName:'',
    placeholderText:'输入评论……',
    toComment:{},

    comment:{
      commentDetail:''
    },
    noteMaxLen: 100,
    currentNoteLen: 0,
  },
  loadComment(){
    var that = this;
    let data = {
      commentId: this.data.commentId
    };
    util.baseGet('showComment', data,
      function (result) {
        console.log(result);
        that.setData({
          toComment: result.data
        })
      },
      function (err) {
        console.log(err);
      })
  },
  _input(event) {
    let value = event.detail.value;
    let len = parseInt(value.length);
    var commentDetail = 'comment.commentDetail';
    this.setData({
        [commentDetail]: value,
        currentNoteLen:len
    })
  },
  sunmitComment(){
    let Time = util.formatTime(new Date());
    let toComment = this.data.toComment;
    let comment = this.data.comment;
    let data = {
      postId: this.data.postId,
      userId: wx.getStorageSync('userDetail').userId,
      userIcon:  wx.getStorageSync('userDetail').userIcon,
      commentUser: wx.getStorageSync('userDetail').nickName,
      commentDetail: comment.commentDetail,
      commentTime: Time,
    };
    let url;
    if (this.data.commentId) {
      url = 'addComment';
      data['commentType'] = 'second';
      data['toUserId'] = toComment.userId;
      data['toNickName'] = toComment.commentUser;
      data['toCommentId'] = toComment.commentId;
    } else {
      url = 'addComment';
      data['commentType'] = 'first';
    }
    let that = this;
    util.baseGet(url, data,
      function (result) {
        console.log(result);
        if (result.data.code == 200) {
          that.updateUserComNum();
          that.updatePostComNum();
          that.updateCommentNum();
          wx.navigateTo({ 
            url: '../postDetail/postDetail?postId='+that.data.postId+'&postName='+that.data.postName
          }) 
        }
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
  updateCommentNum() {
    var that = this;
    let data = {
      commentId: this.data.commentId
    };
    util.baseGet('updateCommentNum', data,
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
    if(options.commentUser) {
      this.setData({
        placeholderText: '回复'+options.commentUser
      })
    }
    this.setData({
      commentUser: options.commentUser,
      commentId: options.commentId,
      postId: options.postId,
      postName: options.postName
    })
    this.loadComment();
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