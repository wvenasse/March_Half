// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    announcements:[  
      {url:'../../utils/imgs/swiper/zucc1.jpg'} ,  
      {url:'../../utils/imgs/swiper/zucc2.jpg'} ,  
      {url:'../../utils/imgs/swiper/zucc3.jpg'} ,  
      {url:'../../utils/imgs/swiper/zucc4.jpg'} 
      ],
    navList:[
      {
        title:'消费',
        value:'../login/login'
      },
      {
        title:'卫生',
        value:'../login/login'
      },
      {
        title:'保修',
        value:'../login/login'
      },
      {
        title:'外出',
        value:'../login/login'
      },
      {
        title:'活动',
        value:'../login/login'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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