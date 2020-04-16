// pages/helpOthers/helpOthers.js
/**
 * 直接从服务器端传递过来真实的下载地址
 */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
    imgUrls: [''],
    //   {
    //   imgURL: '',
    //   userName: '',
    //   building: '',
    //   location: '',
    //   expressCompany: '',
    //   size: '',
    //   createTime: Date()
    // }
    batchIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '加载中',
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
    this.getExpressInfo()
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
    this.getExpressInfo()
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

  /**
   * 获取快递信息函数
   */

  getExpressInfo: function () {
    var that = this
    var batchIndex = this.data.batchIndex
    wx.cloud.callFunction({
      name: 'getHelpOthersExpressInfo',
      data: {
        'batchIndex': batchIndex
      },
      success: function (res) {
        console.log("return value", res.result)
        var _itemList = res.result
        for (let i in _itemList) {
          var newDate = _itemList[i]['insertTime']
          newDate = newDate.replace(/T/, ' ')
          newDate = newDate.substring(0, 16)
          _itemList[i]['insertTime'] = newDate
          var color = _itemList[i]['colorIndex']
          if (color == '无') {
            _itemList[i]['colorIndex'] = ''
          }
          var isAuthorized = _itemList[i]['isAuthorized']
          if (isAuthorized == false) {
            _itemList[i]['colorIndex'] = ''
            _itemList[i]['stringCode'] = ''
            _itemList[i]['slogan'] = '未授权'
          } else {
            _itemList[i]['slogan'] = '查看'
          }
        }
        that.setData({
          itemList: _itemList
        })
        wx.hideLoading()
        console.log(that.data.itemList)
      },
      fail: console.error

    })
  },

  onCheck: function (e) {

    var itemId = e.currentTarget.dataset.index
    var isAuthorized = this.data.itemList[itemId].isAuthorized
    
    this.previewImage(this.data.itemList[itemId].imgUrl)
    // if (isAuthorized) {
    //   // this.setData({
    //   //   'imgUrls':[]
    //   // })
    //   //  console.log("---------", this.data.itemList[itemId])
    //   this.myGetTempFileURL([this.data.itemList[itemId].idImgUrl])
    //   var current = wx.getStorageSync('Urls')
    //   this.previewImage(current)
    // }else{
    //   this.myGetTempFileURL([this.data.itemList[itemId].qrImgUrl])
    //   var current = wx.getStorageSync('Urls')
    //   this.previewImage(current)
    // }


  },

  //预览图片
  previewImage: function (url) {
    var current = url;
    var that = this
    console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: [current] // 需要预览的图片http链接列表  
    })
    // wx.removeStorage('Urls')
  },

  myGetTempFileURL: function (list) {
    
    wx.cloud.getTempFileURL({
      fileList: list,
      success: res => {
        // this.setData({
        //   'imgUrls[0]': res.fileList[0].tempFileURL,
        // })
        // this.data.imgUrls[0] = res.fileList[0].tempFileURL
        try {
          wx.setStorageSync('Urls', res.fileList[0].tempFileURL)
        } catch (e) { }
        // console.log(res.fileList)
      },
      fail: console.error
    })
  }

})