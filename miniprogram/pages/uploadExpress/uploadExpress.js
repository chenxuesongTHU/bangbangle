
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2016-09-01",

    location: [
      '洗浴中心快递超市',
      '大学小递',
      '顺丰金诚驾校取件点',
      '青大京东派',
      '邮政包裹柜',
      '邮政EMS取件点',
      '北门外快递',
      '东门外快递',
    ],
    locationIndex: 0,

    expressCompany: [
      '圆通',
      '韵达',
      '中通',
      '申通',
      '天天',
      '百世',
      '顺丰',
      '京东',
      '邮政包裹',
      'EMS',
      '唯品会',
      '德邦',
      '全峰',
    ],
    expressCompanyIndex: 0,

    color: [
      '红色',
      '黑色',
      '蓝色',
      '无',
    ],
    colorIndex: 3,

    size: [
      '小件',
      '中件',
      '大件',
    ],
    sizeIndex: 0,
    stringCode: '',


  },

  
  bindLocationChange: function (e) {
    console.log('bindLocationChange', e.detail.value);

    this.setData({
      locationIndex: e.detail.value
    })
  },

  bindCompanyChange: function (e) {
    console.log('bindCompanyChange', e.detail.value);

    this.setData({
      expressCompanyIndex: e.detail.value
    })
  },

  bindColorChange: function (e) {
    console.log('bindColorChange', e.detail.value);

    this.setData({
      colorIndex: e.detail.value
    })
  },

  bindSizeChange: function (e) {
    console.log('bindSizeChange', e.detail.value);

    this.setData({
      sizeIndex: e.detail.value
    })
  },

  // 字母数字码
  bindStringCodeInput: function (e) {
    this.setData({
      stringCode: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        if (num == 0) {
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

  },

  OnSubmitExpressInfo: function(){
    console.log('expressInfo submit button click')
    wx.cloud.callFunction({
      name: "dealExpressInfo",
      data: {
        'locationIndex': this.data.location[this.data.locationIndex],
        "expressCompanyIndex": this.data.expressCompany[this.data.expressCompanyIndex],
        "colorIndex": this.data.color[this.data.colorIndex],
        "stringCode": this.data.stringCode,
        "sizeIndex": this.data.size[this.data.sizeIndex],
      },
      success: function (res) {
        console.log("upload return value", res.result)
        
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        
        // setInterval(function () {
        //   // wx.switchTab({
        //   //   url: '../index/index',
        //   // })
        // }, 4000) //循环间隔 单位ms
        // wx.switchTab({
        //   url: '../index/index',
        // })
        
        
      },
      fail: console.error

    })

  },

})