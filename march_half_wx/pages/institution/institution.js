// pages/institution/institution.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    institutionId:0,
    institutionName:'',
    institution:{},
    evaluation:{},
    ellipsis: true,
    icons:[
      't-icon-bangdaiyongyi',
      't-icon-yingerfu',
      't-icon-beixin',
      't-icon-baozhen',
      't-icon-maoyi',
      't-icon-weiyi',
      't-icon-gaolingmaoyi',
      't-icon-yashemao',
      't-icon-shishi',
      't-icon-lvhangbao',
      't-icon-danjianbao',
      't-icon-diannaobao',
      't-icon-chajianTxu',
      't-icon-fentiyongyi',
      't-icon-hanglixiang',
      't-icon-lianshenyongyi',
      't-icon-shoutibao',
      't-icon-taolingshangyi',
      't-icon-gengduo',
    ],
    isLike:false,
    isLove:false,
    likeNum:0,
    loveNum:0,
    likeId:0,
    loveId:0
  },
  
  loadinstitution(){
    var that = this;
    let year = new Date().getFullYear()
    let data={
      institutionId: this.data.institutionId
    };
    util.baseGet('getInstitutionById',data,
      function (result) {
        console.log(result);
        result.data.institutionImg = result.data.institutionImg.split(',');
        result.data.typeId = result.data.typeId.split(',');
        result.data.institutionType = result.data.institutionType.split(',');
        for (let i=0;i<result.data.institutionImg.length;i++) {
          result.data.institutionImg[i] = '../image/' + result.data.institutionImg[i];
        }
        that.setData({
          institution: result.data
        })
      },function (err) {
        console.log(err);
      })
  },
  loadEvaluation(){
    var that = this;
    let data={
      institutionId: this.data.institutionId
    };
    util.baseGet('showAllEvaluationByInstitution',data,
      function (result) {
        console.log(result);
        for (let i=0;i<result.data.length;i++) {
          result.data[i].userIcon = '../image/' + result.data[i].userIcon;
          let imgs = result.data[i].evaluationImg.split(',');
          for (let j=0;j<imgs.length;j++) {
            imgs[j] =  '../image/' + imgs[j];
          }
          result.data[i].evaluationImg = imgs;
        }
        that.setData({
          evaluation: result.data
        })
      },function (err) {
        console.log(err);
      })
  },
  ellipsis: function () {  
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    }) 
  },
  listToggle: function () {
    this.setData({
      showMore: !this.data.showMore
    })
  },
  gotoEvaluation (e) {
    let evaluation = e.currentTarget.dataset['evaluation'];
    wx.navigateTo({
      url: '../evaluation/evaluation?evaluationId='+evaluation.evaluationId
    })
  },
  gotoType (e){
    let typeIndex = e.currentTarget.dataset['typeindex'];
    let typeId = this.data.institution.typeId[typeIndex];
    let typeName = this.data.institution.institutionType[typeIndex];
    let institutionId = parseInt(this.data.institutionId);
    wx.navigateTo({
      url: '../typeList/typeList?typeId='+typeId+'&typeName='+typeName+'&institutionId='+institutionId
    })
  },

  loadLike(){
    var that = this;
    let loveData={
      favorType: 1,
      userId: wx.getStorageSync('userDetail').userId,
      institutionId: this.data.institutionId
    };
    util.baseGet('isFavorInstitution',loveData,
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
      institutionId: this.data.institutionId
    };
    util.baseGet('isFavorInstitution',loveData,
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
      institutionId: this.data.institutionId
    };
    util.baseGet('isFavorInstitutionNum',likeData,
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
      institutionId: this.data.institutionId
    };
    util.baseGet('isFavorInstitutionNum',loveData,
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
        institutionId: this.data.institutionId,
        institutionName: this.data.institutionName
      };
      util.baseGet('addFavor',data,
        function (result) {
          console.log(result);
          if (result.data.code) {
            that.loadLikeNum();
            that.updateUserLikeNum();
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
        institutionId: this.data.institutionId,
        institutionName: this.data.institutionName
      };
      util.baseGet('addFavor',data,
        function (result) {
          console.log(result);
          if (result.data.code) {
            that.loadLoveNum();
            that.updateUserLoveNum();
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      institutionId: options.institutionId,
      institutionName:  options.institutionName,
    })
    wx.setNavigationBarTitle({
      title: this.data.institutionName + '的介绍'
    })
    this.loadinstitution();
    this.loadEvaluation();
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