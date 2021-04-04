// pages/postDetail/postDetail.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId:0,
    postName:'',
    post:{},
    firstComment:[],
    isShowDelete:false,
    currentComment:{},
    userId: wx.getStorageSync('userDetail').userId,
    isLike:false,
    isLove:false,
    likeNum:0,
    loveNum:0,
    likeId:0,
    loveId:0,
    identity: wx.getStorageSync('identity')||'user'
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
  loadComment(){
    var that = this;
    let data = {
      postId: this.data.postId
    };
    util.baseGet('showAllCommentFirst', data,
      function (result) {
        console.log(result);
        that.setData({
          firstComment: result.data
        })
      },
      function (err) {
        console.log(err);
      })
  },
  openSecondComment(e){
    let comment = e.currentTarget.dataset['firstcomment'];
    let index = e.currentTarget.dataset['commentindex'];
    let firstComment = this.data.firstComment;
    var that = this;
    if (comment.isSecondComment) {
      firstComment[index].isSecondComment = false;
      that.setData({
        firstComment: firstComment
      })
      return;
    }
    let data = {
      postId: this.data.postId,
      toCommentId: comment.commentId
    };
    util.baseGet('showAllCommentSecond', data,
      function (result) {
        console.log(result);
        firstComment[index].secondComment = result.data;
        firstComment[index].isSecondComment = true;
        that.setData({
          firstComment: firstComment
        })
      },
      function (err) {
        console.log(err);
      })
  },
  sendComment(e){
    let comment = e.currentTarget.dataset['comment'];
    if (comment) {
      wx.navigateTo({
        url: '../send-comment/send-comment?commentId='+comment.commentId+'&commentUser='+comment.commentUser+'&postId='+this.data.postId+'&postName='+this.data.postName
      })
    }
    else {
      wx.navigateTo({
        url: '../send-comment/send-comment?postId='+this.data.postId+'&postName='+this.data.postName
      })
    }
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
      },function (err) {
        console.log(err);
      })
  },

  loadLike(){
    var that = this;
    let loveData={
      favorType: 1,
      userId: wx.getStorageSync('userDetail').userId,
      postId: this.data.postId
    };
    util.baseGet('isFavorPost',loveData,
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
      postId: this.data.postId
    };
    util.baseGet('isFavorPost',loveData,
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
      postId: this.data.postId
    };
    util.baseGet('isFavorPostNum',likeData,
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
      postId: this.data.postId
    };
    util.baseGet('isFavorPostNum',loveData,
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
        postId: this.data.postId,
        postName: this.data.postName
      };
      util.baseGet('addFavor',data,
        function (result) {
          console.log(result);
          if (result.data.code == 200) {
            that.loadLikeNum();
            that.updateUserLikeNum();
            that.updatePostLikeNum();
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
        postId: this.data.postId,
        postName: this.data.postName
      };
      util.baseGet('addFavor',data,
        function (result) {
          console.log(result);
          if (result.data.code == 200) {
            that.loadLoveNum();
            that.updateUserLoveNum();
            that.updatePostLoveNum();
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
    this.setData({
      postId: options.postId,
      postName:  options.postName,
    })
    wx.setNavigationBarTitle({
      title: this.data.postName
    })
    this.loadPost();
    this.loadComment();
    this.loadLikeNum();
    this.loadLoveNum();
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