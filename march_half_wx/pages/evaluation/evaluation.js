var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    evaluationId: 0,
    evaluation: {}
  },
  loadEvaluation() {
    var that = this;
    let data = {
      evaluationId: this.data.evaluationId
    };
    util.baseGet('showEvaluation', data,
      function (result) {
        console.log(result);
        result.data.userIcon = result.data.userIcon;
        let imgs = result.data.evaluationImg.split(',');
        for (let j = 0; j < imgs.length; j++) {
          imgs[j] = util.imageUrl(imgs[j]);
        }
        result.data.evaluationImg = imgs;
        that.setData({
          evaluation: result.data
        })
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
      evaluationId: options.evaluationId
    })
    this.loadEvaluation();
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