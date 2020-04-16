// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  openId = event.userInfo.openId
  try {
    return await db.collection('studentInfo').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        "openId": openId,
        "name": event.name,
        "gender": event.gender,
        "buildingIndex": event.buildingIndex,
        "room": event.room,
        "phone": event.phone,
        "qrImgPath": event.qrImgPath,
        "idImgPath": event.idImgPath,
        "profileImgPath": event.profileImgPath,
        "insertTime": db.serverDate({ offset: 8 * 60 * 60 * 1000 })
      }
    })
  } catch (e) {
    console.log(e)
  }
}