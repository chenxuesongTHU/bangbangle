// modify

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2016-09-01",

    // building: [
    //   '1号楼',
    //   '2号楼',
    //   '3号楼',
    //   '4号楼',
    //   '5号楼',
    //   '6号楼',
    //   '7号楼',
    //   '8号楼',
    //   '9号楼',
    //   '10号楼',
    //   '11号楼',
    //   '12号楼',
    //   '13号楼',
    //   '14号楼',
    //   '15号楼',
    //   '16号楼',
    //   '17号楼',
    //   '18号楼',
    //   '19号楼',
    //   '20号楼',
    //   '21号楼',
    //   '22号楼',
    //   '23号楼',
    //   '行政A楼',
    //   '行政B楼',
    //   '行政C楼',
    // ],
    building: null,
    buildingIndex: 0,
    name: '',
    room: '',
    phone: '',
    qrImgPath: '',
    idImgPath: '',
    profileImgPath: '',
    gender: [
      '男',
      '女'
    ],
    genderIndex: 0
  },

  bindBuildingChange: function (e) {

    this.setData({
      buildingIndex: e.detail.value
    })
  },

  bindGenderChange: function (e) {
    this.setData({
      genderIndex: e.detail.value
    })
  },

  // 上传图片
  doUpload: function (e) {

    // console.log(e.currentTarget.dataset.type)
    var prefix = ""
    var openid = ""
    var whichKindOfPath = ""

    if (e.currentTarget.dataset.type == "qr") {
      // console.log(prefix)
      prefix = "qr_"
      whichKindOfPath = "qrImgPath"

    }
    if (e.currentTarget.dataset.type == "id") {
      prefix = "id_"
      whichKindOfPath = "idImgPath"
    }
    if (e.currentTarget.dataset.type == "profile") {
      prefix = "profile_"
      whichKindOfPath = "profileImgPath"
    }
    var openid = wx.getStorageSync('openid')
    var imageName = prefix + openid
    var cloudPath
    // console.log('openid', openid)
    // console.log("imagename", imageName)
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        cloudPath = imageName + filePath.match(/\.[^.]+?$/)[0]
        // console.log("cloudPath", cloudPath)

        wx.cloud.deleteFile({
          fileList: [cloudPath],
          success: res => {
            // handle success
            // console.log(res.fileList)
          },
          fail: err => {
            // handle error
          }
        })


        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            // console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: (e) => {


            wx.hideLoading()
            wx.showToast({
              title: '上传成功！',
            })

            var fileID = e.fileID
            console.log(whichKindOfPath, fileID)
            wx.setStorageSync(whichKindOfPath, fileID)
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.cloud.callFunction({
      name: 'getBuildingInfo',
      data: {
        campusAbbreviate: 'qhu'
      },
      success: res => {
        console.log('get building info', res.result)
        this.setData({
          building: res.result
        })
      },
      fail: err => {
        console.error('get building Info fail', err)
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

  // name input 
  bindNameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  // room input
  bindRoomInput: function (e) {
    this.setData({
      room: e.detail.value
    })
  },


  bindPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // save operation
  saveStudentInfo: function () {
    console.log('all data:', this.data)
    if(!this.data.room || !this.data.name || !this.data.phone){
      console.log("---------缺失-----------")
      wx.showToast({
        title: '请提供完整信息！',
      })
      return
    }

    wx.cloud.callFunction({
      name: "savePersonalInfo",
      data: {
        'a': 1,
        'name': this.data.name,
        'gender': this.data.gender[this.data.genderIndex],
        "buildingIndex": this.data.building[this.data.buildingIndex],
        "room": this.data.room,
        "phone": this.data.phone,
        "qrImgPath": wx.getStorageSync('qrImgPath'),
        "idImgPath": wx.getStorageSync('idImgPath'),
        "profileImgPath": wx.getStorageSync('profileImgPath'),
      },
      success: function (res) {
        console.log("return value", res.result)
        setTimeout(function(){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          }), 3000
        })
        
        wx.navigateBack({
          delta: 1
        })
      },
      fail: console.error

    })
  }
})