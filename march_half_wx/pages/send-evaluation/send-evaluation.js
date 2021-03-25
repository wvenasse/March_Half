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
    fileList: [],
  },
  loadOrder(orderId) {
    var that = this;
    let data = {
      orderId: orderId,
    };
    util.baseGet('showOrder', data,
      function (result) {
        console.log(result);
        result.data.serviceImg = '../image/'+result.data.serviceImg;
        that.setData({
          order: result.data
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
  afterRead(event) {
    const { file } = event.detail;
    console.log(event);
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'http://localhost:8088/uploadPic', // 仅为示例，非真实的接口地址
    //   filePath: file.url,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    // });
  },
  sbumitEvalustion() {
    let order = this.data.order;
    let evaluation = this.data.evaluation;
    let Time = util.formatTime(new Date());
    var that = this;
    let data = {
      evaluationStatus: evaluation.evaluationStatus,
      evaluationStar: evaluation.evaluationStar,
      evaluationImg: evaluation.evaluationImg,
      evaluationDetail: evaluation.evaluationDetail,
      evaluationTime: Time,
      isNoName: evaluation.isNoName,

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
      serviceId: this.order.serviceId
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
      institutionId: this.order.institutionId
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
      serviceId: this.order.serviceId
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
      institutionId: this.order.institutionId
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
    // 
    this.loadOrder(options.orderId);
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