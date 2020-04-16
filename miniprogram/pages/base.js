function doUpload(e) {

  console.log(e.currentTarget.dataset.type)
  var prefix = ""
  var openid = ""

  if (e.currentTarget.dataset.type == "qr") {
    // console.log(prefix)
    prefix = "qr_"
  }
  if (e.currentTarget.dataset.type == "id") {
    prefix = "id_"
  }
  if (e.currentTarget.dataset.type == "profile") {
    prefix = "profile_"
  }
  var openid = wx.getStorageSync('openid')
  var imageName = prefix + openid
  console.log('openid', openid)
  console.log("imagename", imageName)
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
      const cloudPath = imageName + filePath.match(/\.[^.]+?$/)[0]

      wx.cloud.deleteFile({
        fileList: [cloudPath],
        success: res => {
          // handle success
          console.log(res.fileList)
        },
        fail: err => {
          // handle error
        }
      })


      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          console.log('[上传文件] 成功：', res)

          app.globalData.fileID = res.fileID
          app.globalData.cloudPath = cloudPath
          app.globalData.imagePath = filePath
          wx.showToast({
            title: '上传成功',
          })
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
        complete: () => {
          wx.hideLoading()
        }
      })

    },
    fail: e => {
      console.error(e)
    }
  })
}