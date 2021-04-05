var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    evaluation: {
      evaluationStatus:'',
      evaluationStar:0,
      evaluationImg:'',
      evaluationDetail:'',
      isNoName:false
    },
    evaluationStar:'',
    noteMaxLen: 200,
    currentNoteLen: 0,
    imageUrlList: [],
  },
  loadOrder(orderId) {
    var that = this;
    let data = {
      orderId: orderId,
    };
    util.baseGet('showOrder', data,
      function (result) {
        console.log(result);
        result.data.serviceImg = util.imageUrl(result.data.serviceImg);
        that.setData({
          order: result.data
        })
      },
      function (err) {
        console.log(err);
      })
  },
  loadEvaluation(orderId) {
    var that = this;
    let data = {
      orderId: orderId,
    };
    util.baseGet('showEvaluationByOrder', data,
      function (result) {
        console.log(result);
        result.data.evaluationImg = result.data.evaluationImg.split(',');
        let imgList = [];
        result.data.evaluationImg.forEach(function(image) {
          image = util.imageUrl(image);
          imgList.push(image);
        });
        result.data.isNoName = !!result.data.isNoName;
        that.setData({
          evaluation: result.data,
          imageUrlList: imgList
        })
      },
      function (err) {
        console.log(err);
      })
  },
  onStarChange(event){
    let evaluationStar = 'evaluation.evaluationStar';
    let evaluationStatus = 'evaluation.evaluationStatus';
    let star = '';
    let status = '';
    if (event.detail<=1) {
      star = '极差';
      status = '差评'
    }
    else if (event.detail<=2) {
      star = '失望';
      status = '差评'
    }
    else if (event.detail<=3) {
      star = '一般';
      status = '中评'
    }
    else if (event.detail<=4) {
      star = '满意';
      status = '中评'
    }
    else if (event.detail<=5) {
      star = '惊喜';
      status = '好评'
    }
    this.setData({
      [evaluationStar]: event.detail,
      evaluationStar:star,
      [evaluationStatus]:status
    });
  },
  onIsNameChange({ detail }) {
    let isName = "evaluation.isNoName"
    this.setData({ [isName]: detail });
  },
  _input(event) {
    let value = event.detail.value;
    let len = parseInt(value.length);
    var evaluationDetail = 'evaluation.evaluationDetail';
    this.setData({
        [evaluationDetail]: value,
        currentNoteLen:len
    })
  },
  chooseImage(){
    var that = this;
    let uploadImage = this.data.imageUrlList;
    wx.chooseImage({
      success: function(res) {
        console.log(res);
        let date = util.formatTime2(new Date());
        let tempFilePaths = res.tempFilePaths;
        for (let i=0; i<tempFilePaths.length; i++) {
          let tempFile = tempFilePaths[i];
          let type = tempFile.substring(tempFile.lastIndexOf('.'));
          let tempFileName = date+'-'+i + type;
          wx.cloud.uploadFile({
            cloudPath: tempFileName,
            filePath: tempFilePaths[i],
            success: res => {
              uploadImage.push(res.fileID);
              that.setData({
                imageUrlList: uploadImage
              })
            },
            fail: console.error
          })
        }
        
      }
    })
  },
  deleteImage(e){
    let image = e.currentTarget.dataset['image'];
    let imageIndex = e.currentTarget.dataset['imageIndex'];
    let imageUrlList = this.data.imageUrlList;
    let imgList = [image];
    let that = this;
    wx.cloud.deleteFile({
      fileList: imgList,
      success: res => {
        if (res.fileList[0].errMsg == 'ok') {
          imageUrlList.splice(imageIndex,1);
          that.setData({
            imageUrlList: imageUrlList
          })
        }
      },
      fail: console.error
    })
  },
  sbumitEvalustion() {
    let order = this.data.order;
    let evaluation = this.data.evaluation;
    let Time = util.formatTime(new Date());
    let imageUrlList = this.data.imageUrlList;
    for (let i=0;i<imageUrlList.length;i++) {
      imageUrlList[i] = imageUrlList[i].split('/')[3];
    }
    var that = this;
    let data = {
      evaluationStatus: evaluation.evaluationStatus,
      evaluationStar: evaluation.evaluationStar,
      evaluationImg: imageUrlList.join(','),
      evaluationDetail: evaluation.evaluationDetail,
      evaluationTime: Time,
      isNoName: evaluation.isNoName?'true':'false',

      userId: order.userId,
      userIcon:  wx.getStorageSync('userDetail').userIcon,
      evaluationUser: order.orderUser,
      serviceId: order.serviceId,
      evaluationService: order.orderService,
      institutionId: order.institutionId,
      evaluationInstitution: order.orderInstitution,
      typeId: order.typeId,
      evaluationType: order.orderType,
      orderId: order.orderId
    };
    console.log(data)
    util.baseGet('addEvaluation', data,
      function (result) {
        console.log(result);
        if (result.data.code == 200) {
          that.updateOrderStatus( order.orderId);
          that.updateUserEvaNum();
          that.updateServiceEvaNum();
          that.updateServiceStar();
          that.updateInstitutionEvaNum();
          that.updateInstitutionStar();
        }
      },
      function (err) {
        console.log(err);
      })
  },

  updateOrderStatus(orderId){
    var that = this;
    let data={
      orderId: orderId,
      orderStatus: '4'
    };
    util.baseGet('updateOrderStatus',data,
      function (result) {
        console.log(result);
        if (result.data.code == 200) {
          wx.switchTab({ 
            url: '../order/order'
          }) 
        }
      },function (err) {
        console.log(err);
      })
  },
  updateUserEvaNum() {
    var that = this;
    let data = {
      userId: wx.getStorageSync('userDetail').userId
    };
    util.baseGet('updateUserEvaNum', data,
      function (result) {
        console.log(result);
      },
      function (err) {
        console.log(err);
      })
  },
  updateServiceEvaNum() {
    var that = this;
    let data = {
      serviceId: this.data.order.serviceId
    };
    util.baseGet('updateServiceEvaNum', data,
      function (result) {
        console.log(result);
      },
      function (err) {
        console.log(err);
      })
  },
  updateInstitutionEvaNum() {
    var that = this;
    let data = {
      institutionId: this.data.order.institutionId
    };
    util.baseGet('updateInstitutionEvaNum', data,
      function (result) {
        console.log(result);
      },
      function (err) {
        console.log(err);
      })
  },
  updateServiceStar() {
    var that = this;
    let data = {
      serviceId: this.data.order.serviceId
    };
    util.baseGet('updateServiceStar', data,
      function (result) {
        console.log(result);
      },
      function (err) {
        console.log(err);
      })
  },
  updateInstitutionStar() {
    var that = this;
    let data = {
      institutionId: this.data.order.institutionId
    };
    util.baseGet('updateInstitutionStar', data,
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
    this.loadOrder(options.orderId);
    if (options.flag == '2') {
      this.loadEvaluation(options.orderId);
    }
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