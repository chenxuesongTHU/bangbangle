// pages/expressDetail/expressDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLike: true,
    // banner
    imgUrls: [
      
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    
    // 条目详细信息
    dataObj: null,
    name: null,
    gender: null
  },
  //预览图片
  previewImage: function(e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  // 立即购买
  immeBuy() {
    // wx.showToast({
    //   title: '请通过微信二维码联系对方授权，即可在“我的”模块查看到对方的证件和快递取件码！',
    //   // icon: 'success',
    //   duration: 3000
    // });
    this.toastShow('请通过微信二维码联系对方授权，即可在“我的”模块查看到对方的证件和快递取件码！', "icon-suo");
    wx.cloud.callFunction({
      name: 'changeCurrentExpressStatus',
      data: {
        expressId: this.data.dataObj._id
      },
      success: res => {
        console.log('change current express status success')
        console.log(res.result)
      },
      fail: err => {
        console.log(err)
      },
      complete: () => {
        // ...
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // console.log("what??????????")
    // 判断是否是注册用户
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'isRegister',
      // 传递给云函数的参数
      data: {
        
      },
      success: res => {
        // output: res.result === 3
        console.log('->->->->->', res)
        var num = res.result.total
        if(num == 0){
          wx.redirectTo({
            url: '../addUserInfo/addUserInfo',
          })
        }
      },
      fail: err => {
        // handle error
        console.log(err)
      },
      complete: () => {
        // ...
      }
    })



    this.data.dataObj = JSON.parse(options.dataObj)
    console.log('onLoad', this.data.dataObj)
    // this.data.imgUrls[0] = this.data.dataObj.profileUrl
    // this.data.imgUrls[1] = this.data.dataObj.qrImgUrl
    this.setData({
      'name': this.data.dataObj.name,
      'building': this.data.dataObj.building,
      'gender': this.data.dataObj.gender,
      'location': this.data.dataObj.locationIndex,
      'size': this.data.dataObj.sizeIndex,
      'company': this.data.dataObj.expressCompanyIndex

    })
    wx.cloud.getTempFileURL({
      fileList: [this.data.dataObj.profileUrl, this.data.dataObj.qrImgUrl],
      success: res => {
        // fileList 是一个有如下结构的对象数组
        // [{
        //    fileID: 'cloud://xxx.png', // 文件 ID
        //    tempFileURL: '', // 临时文件网络链接
        //    maxAge: 120 * 60 * 1000, // 有效期
        // }]
        this.setData({
          'imgUrls[0]': res.fileList[0].tempFileURL,
          'imgUrls[1]': res.fileList[1].tempFileURL
        })

        // console.log(res.fileList)
      },
      fail: console.error
    })
    console.log('result', this.data.imgUrls)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  toastShow: function (str, icon) {
    var _this = this;
    _this.setData({
      isShow: true,
      txt: str,
      iconClass: icon
    });
    setTimeout(function () {    //toast消失
      _this.setData({
        isShow: false
      });
    }, 5000);
  }

})