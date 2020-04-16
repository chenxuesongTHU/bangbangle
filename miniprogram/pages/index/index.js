// pages/findInfo/findInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: null,
    //   {
    //   imgURL: '',
    //   userName: '',
    //   building: '',
    //   location: '',
    //   expressCompany: '',
    //   size: '',
    //   createTime: Date()
    // }
    batchIndex: 0,
    flag: true,
    introImgUrl: 'cloud://bang-1d1843.6261-bang-1d1843/introImg.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '加载中',
    })


    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        wx.setStorage({
          key: 'openid',
          data: res.result.openid,
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
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
    this.setData({
      'batchIndex': 0,
      'itemList': null
    })
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

    wx.showLoading({
      title: '加载中',
    })

    this.setData({
      'batchIndex': 0,
      'itemList': null
    })
    console.log('pull down')
    wx.showNavigationBarLoading()
    // this.onShow()
    this.getExpressInfo()
    // setInterval(function () {

    // }, 1000) //循环间隔 单位ms
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    wx.showLoading({
      title: '加载中',
    })

    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2300)


    var that = this;
    var batchIndex = this.data.batchIndex
    // 显示加载图标

    // wx.showLoading({
    // title: '玩命加载中',
    // })
    this.getExpressInfo()


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
      name: 'getExpressInfo',
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

        }
        var oldItemList = that.data.itemList
        if (oldItemList == null) {
          oldItemList = _itemList
        } else {
          for (let i in _itemList) {
            oldItemList.push(_itemList[i])
          }
        }
        that.setData({
          itemList: oldItemList
        })
        wx.hideLoading()
        // console.log(that.data.itemList)
      },
      fail: console.error

    })
    // 隐藏加载框
    // wx.hideLoading();
    batchIndex++
    this.setData({
      "batchIndex": batchIndex
    })
  },

  // 遮罩层代码设置  
  showMask: function () {
    this.setData({ flag: false })
  },
  closeMask: function () {
    this.setData({ flag: true })
  },

})

// wx.getSetting({
//   success: res => {
//     if (res.authSetting['scope.userInfo']) {
//       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//       wx.getUserInfo({
//         success: res => {
//           this.setData({
//             userInfo: res.userInfo
//           })

//           // 存储登陆用户信息
//           // wx.cloud.callFunction({
//           //   name: "saveLoginUserInfo",
//           //   data: {
//           //     "nickName": this.data.userInfo.nickName,
//           //     "gender": this.data.userInfo.gender,
//           //     "language": this.data.userInfo.language,
//           //     "city": this.data.userInfo.city,
//           //     "province": this.data.userInfo.province,
//           //     "country": this.data.userInfo.country,
//           //     'avatarUrl': this.data.userInfo.avatarUrl,
//           //   },
//           //   success: function (res) {
//           //     console.log("return value", res.result)
//           //   },
//           //   fail: console.error

//           // })
//         }
//       })
//     } else if (res.authSetting['scope.userInfo'] === false) { // 授权弹窗被拒绝
//       wx.openSetting({
//         success: res => {
//           console.log(res)
//         },
//         fail: res => {
//           console.log(res)
//         }
//       })
//     } else { // 没有弹出过授权弹窗
//       wx.getUserInfo({
//         success: res => {
//           console.log(res)
//           this.setUserInfoAndNext(res)
//         },
//         fail: res => {
//           console.log(res)
//           wx.openSetting({
//             success: res => {
//               console.log(res)
//             },
//             fail: res => {
//               console.log(res)
//             }
//           })
//         }
//       })
//     }




//   }
// })