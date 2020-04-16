// pages/myInfo/myInfo.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: './user-unlogin.jpg',
    userName: '用户',
    gender: 0,
    genderImg: '',
    buildingNumber: null,
    roomNumber: null,
    backgroundImgUrl: './qhuLogo.jpg',
    nickName: '青海大学',
    imgList: [{
        title: '微信二维码',
        url: '../../images/loading.jpg',
      },
      {
        title: '身份信息',
        url: '../../images/loading.jpg',
      },
      {
        title: '个人照片',
        url: '../../images/loading.jpg',
      }
    ],
    urlList: [
      '../../images/loading.jpg',
      '../../images/loading.jpg',
      '../../images/loading.jpg',
    ],
    list: 3,
    grids: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  },

  previewImg: function(e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgList = this.data.imgList;
    var urlList = this.data.urlList;
    wx.previewImage({
      current: urlList[index], //当前图片地址
      urls: urlList, //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })

            }
          })
        }


      }
    })

    // 判断是否是注册用户
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'isRegister',
      // 传递给云函数的参数
      data: {

      },
      success: res => {
        // output: res.result === 3
        // console.log('->->->->->', res)
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
  onReady: function() {
    wx.setNavigationBarTitle({
      title: '我的',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 用openid换取imgUrls

    wx.cloud.callFunction({
      name: 'getImgUrls',
      data: {},
      success: res => {
        // console.log(res.result[0])
        var _qrImgPath = res.result[0].tempFileURL
        var _idImgPath = res.result[1].tempFileURL
        var _profileImgPath = res.result[2].tempFileURL
        // console.log(_qrImgPath)
        // console.log(_idImgPath)
        // console.log(_profileImgPath)
          this.setData({
            urlList: [_qrImgPath, _idImgPath, _profileImgPath],
            'imgList[0].url': _qrImgPath,
            'imgList[1].url': _idImgPath,
            'imgList[2].url': _profileImgPath,
          })
   

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

    wx.cloud.callFunction({
      name: 'getStudentInfo',
      data: {},
      success: res=>{
        console.log('get student info', res)
        this.setData({
          userName: res.result.name,
          buildingNumber: res.result.buildingIndex,
          roomNumber: res.result.room
        })
        if (res.result.gender == '男') {
          this.setData({
            gender: 1,
            genderImg: '../../images/male.jpg'
          })
        }
        else if (res.result.gender == '女') {
          this.setData({
            gender: 2,
            genderImg: '../../images/female.jpg'
          })
        }
        else{
          this.setData({
            gender: 0,
            genderImg: '../../images/unknowGender.jpg'
          })
        }

              // 获取展示图片的
      },
      fail: err => {
        console.error('get Student Info fail', err)
      }
    })

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

  toModify: function(){
    wx.navigateTo({
      url: '../modifyUserInfo/modifyUserInfo',
    })
  }

})