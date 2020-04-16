// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  const db = cloud.database()
  openId = event.userInfo.openId
  try {
    return await db.collection('LoginUserInfo').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        "openId": openId,
        "nickName": event.nickName,
        "gender": event.gender,
        "language": event.language,
        "city": event.city,
        "province": event.province,
        "country": event.country,
        "avatarUrl": event.avatarUrl,
        "insertTime": db.serverDate({offset: 8 * 60 * 60 * 1000})
      }
    })
  } catch (e) {
    console.log(e)
  }
}