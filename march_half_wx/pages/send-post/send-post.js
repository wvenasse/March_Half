// pages/send-post/send-post.js
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    postId:0,
    postName:'',
    post:{
      postId:'',
      postTitle:'',
      postImg:'',
      postDetail:'',
      postTime:'',
      postName:'',
  
      userId:'',
      userIcon:'',
      postUser:'',
      typeId:'',
      postType:'',
      isNoName:false,
    },
    type:[],
    isShowType:false,
    noteMaxLen: 100,
    currentNoteLen: 0,
  },
  loadType(){
    var that = this;
    let data;
    util.baseGet('showAllType',data,
      function (result) {
        console.log(result);
        that.setData({
          type: result.data
        })
      },function (err) {
        console.log(err);
      })
  },
  onTypeOpen() {
    this.setData({ isShowType: true });
  },
  onTypeClose() {
    this.setData({ isShowType: false });
  },
  onTypeSelect(e) {
    let type = e.currentTarget.dataset['type'];
    var typeId = 'post.typeId';
    var postType = 'post.postType';
    this.setData({ 
      [typeId]: type.typeId,
      [postType]: type.typeName,
      isShowType: false
    });
  },
  input(e){
    var postTitle = 'post.postTitle';
    this.setData({
      [postTitle]: e.detail.value
    })
  },
  _input(event) {
    let value = event.detail.value;
    let len = parseInt(value.length);
    var postDetail = 'post.postDetail';
    this.setData({
        [postDetail]: value,
        currentNoteLen:len
    })
  },
  onIsNoNameChange({ detail }) {
    var isNoName = 'post.isNoName';
    this.setData({ [isNoName]: detail });
  },
  submitPost(){
    let Time = util.formatTime(new Date());
    let post = this.data.post;
    let Name = wx.getStorageSync('userDetail').nickName + ',' + post.postType + ',' + post.postTitle;
    let data = {
      postTitle: post.postTitle,
      postImg: '',
      postDetail: post.postDetail,
      postTime: Time,
      isNoName: post.isNoName,
      postName: Name,
      postTop: 't',//f-t
      postPop: 'false',
      userId: wx.getStorageSync('userDetail').userId,
      userIcon: wx.getStorageSync('userDetail').userIcon,
      postUser: wx.getStorageSync('userDetail').nickName,
      typeId: post.typeId,
      postType: post.postType,
    };
    let url;
    if (this.data.postId) {
      url = 'updatePost';
      data['postId'] = this.data.postId;
    } else {
      url = 'addPost';
    }
    let that = this;
    util.baseGet(url, data,
      function (result) {
        console.log(result);
        if (result.data.code == 200) {
          that.updateUserPostNum();
          wx.navigateTo({ 
            url: '../post/post'
          }) 
        }
      },
      function (err) {
        console.log(err);
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
    this.loadType();
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