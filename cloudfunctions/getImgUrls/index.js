// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  openId = event.userInfo.openId
  // return openId
  try {
    dataList = await db.collection('studentInfo')
      .where({
        openId: openId,
      })
      .orderBy('insertTime', 'desc').limit(1).get()
  } catch (e) {
    console.error(e)
  }
  _qrImgPath = dataList.data[0].qrImgPath
  _idImgPath = dataList.data[0].idImgPath
  _profileImgPath = dataList.data[0].profileImgPath

  const fileList = [_qrImgPath, _idImgPath, _profileImgPath]
  const result = await cloud.getTempFileURL({
    fileList,
  })
  return result.fileList
  // result_dic = {
  //   'qrImgpath': _qrImgPath,
  //   'idImgPath': _idImgPath,
  //   'profileImgPath': _profileImgPath
  // }

  // return result_dic
}