// pages/post/post.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:[],
    activeType:0,
    searchValue:'',
    post:[],
    postValue:'',
    identity: wx.getStorageSync('identity')||'user'
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
        that.loadPost();
      },function (err) {
        console.log(err);
      })
  },
  onTypeClick(event) {
    this.setData({
      activeType: event.detail.name 
    })
    this.loadPost();
  },
  loadPost(){
    var that = this;
    let searchValue = this.data.searchValue;
    let data = {
      typeId: this.data.type[this.data.activeType].typeId
    };
    util.baseGet('showAllPostByType',data,
      function (result) {
        console.log(result);
        for (let i=0;i<result.data.length;i++) {
          let imgs = result.data[i].postImg.split(',');
          if (imgs[0]) {
            for (let j=0;j<imgs.length;j++) {
              imgs[j] = util.imageUrl(imgs[j]);
            }
          }
          result.data[i].postImg = imgs;
          if (searchValue && result.data[i].postName.indexOf(searchValue)==-1) {
            result.data.splice(i,1);
            i--;
          } 
        }
        that.setData({
          post: result.data
        })
      },function (err) {
        console.log(err);
      })
  },
  search(e){
    this.setData({
      searchValue: e.detail.value
    })
    this.loadPost();
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