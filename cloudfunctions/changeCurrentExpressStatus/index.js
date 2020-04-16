// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  var openId = event.userInfo.openId
  var expressId = event.expressId
  const db = cloud.database()
  // return expressId
  var messg = []
  const _ = db.command
  try {
    return await db.collection('expressInfo').where({
        _id: expressId
      })
      .update({
        data: {
          status: true,
          fetchMan: openId
        },
      })
  } catch (e) {
    console.error(e)
  }


}