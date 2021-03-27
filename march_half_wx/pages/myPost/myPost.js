// pages/post/post.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:[],
    isShowDelete:false,
    currentPost:{}
  },
  loadPost(){
    var that = this;
    let data = {
      userId: wx.getStorageSync('userDetail').userId
    };
    util.baseGet('showAllPostByUser',data,
      function (result) {
        console.log(result);
        for (let i=0;i<result.data.length;i++) {
          let imgs = result.data[i].postImg.split(',');
          if (imgs[0]) {
            for (let j=0;j<imgs.length;j++) {
              imgs[j] = '../image/' + imgs[j];
            }
          }
          result.data[i].postImg = imgs;
        }
        that.setData({
          post: result.data
        })
      },function (err) {
        console.log(err);
      })
  },
  openDetele(e){
    let post = e.currentTarget.dataset['post'];
    this.setData({
      isShowDelete: true,
      currentPost:post
    })
  },
  closeDelete(){
    this.setData({
      isShowDelete: false
    })
  },
  deletePost(){
    let post = this.data.currentPost;
    var that = this;
    let data={
      postId: post.postId
    };
    util.baseGet('delPost',data,
      function (result) {
        console.log(result);
        that.loadPost();
        that.setData({
          isShowDelete: false
        })
        that.updateUserPostNum();
      },function (err) {
        console.log(err);
      })
  },
  sendPost(){
    wx.navigateTo({
      url: '../send-post/send-post'
    })
  },
  gotoPostDetail(e){
    let post = e.currentTarget.dataset['post'];
    wx.navigateTo({
      url: '../postDetail/postDetail?postId='+post.postId+'&postName='+post.postName
    })
  },
  updateUserPostNum() {
    var that = this;
    let data = {
      userId: wx.getStorageSync('userDetail').userId
    };
    util.baseGet('updateUserPostNum', data,
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