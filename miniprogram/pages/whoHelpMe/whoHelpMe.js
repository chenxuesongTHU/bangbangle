// pages/whoHelpMe/whoHelpMe.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
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

  // 跳转到详情页面
  onNavigateToDetail: function (e) {
    console.log('detail:', e)
    var itemId = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../expressDetail/expressDetail?dataObj=' + JSON.stringify(this.data.itemList[itemId])
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
   * 
   * 获取快递信息函数
   * @param:
   *   openid
   * @return:
   *   对方的姓名
   *   对方的照片
   * 
   */

  getExpressInfo: function () {
    var that = this
    var batchIndex = this.data.batchIndex
    wx.cloud.callFunction({
      name: 'getWhoHelpMeExpressInfo',
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

          var isAuthorized = _itemList[i]['isAuthorized']
          if (isAuthorized == false) {
            _itemList[i]['colorIndex'] = ''
            _itemList[i]['stringCode'] = ''
            _itemList[i]['slogan'] = '授权'
          } else {
            _itemList[i]['slogan'] = '已授权'
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

  onToAuthorize: function(e) {
    
    var itemId = e.currentTarget.dataset.index
    var slogan = this.data.itemList[itemId].slogan
    if (slogan == '已授权'){
      return
    }
    console.log(this.data.itemList[itemId]._id)
    wx.cloud.callFunction({
      name: 'authorizeFetchMan',
      data: {
        expressId: this.data.itemList[itemId]._id
      },
      success: res => {
        console.log('change current authorization status success')
        console.log(res.result)
        wx.showToast({
          title: '授权成功！',
        })
        this.onShow()
      },
      fail: err => {
        console.log(err)
      },
      complete: () => {
        // ...
      }
    })
  }
})