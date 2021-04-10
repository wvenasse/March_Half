// pages/postDetail/postDetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:[],
    isShowDelete:false,
    currentComment:{},
    userId: wx.getStorageSync('userDetail').userId,
  },
  loadComment(){
    var that = this;
    let data = {
      userId: this.data.userId
    };
    util.baseGet('showAllCommentByUser', data,
      function (result) {
        console.log(result);
        that.setData({
          comment: result.data
        })
      },
      function (err) {
        console.log(err);
      })
  },

  openDetele(e){
    let comment = e.currentTarget.dataset['comment'];
    this.setData({
      isShowDelete: true,
      currentComment:comment
    })
  },
  closeDelete(){
    this.setData({
      isShowDelete: false
    })
  },
  deleteComment(){
    let comment = this.data.currentComment;
    var that = this;
    let data={
      commentId: comment.commentId
    };
    util.baseGet('delComment',data,
      function (result) {
        console.log(result);
        that.loadComment();
        that.setData({
          isShowDelete: false
        })
        that.updateUserComNum();
        that.updatePostComNum();
        that.updateCommentNum();
        wx.showToast({
          title: '删除成功',
          icon: 'succes',
          duration: 1000,
          mask:true
        })
      },function (err) {
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
      postId: this.data.currentComment.postId
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
      commentId: this.data.currentComment.commentId
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