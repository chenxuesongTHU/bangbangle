// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  openId = event.userInfo.openId
  const db = cloud.database()
  // return 'this is isRegister Function'
  return await db.collection('studentInfo').where({
    openId: openId // 填入当前用户 openid
  }).count()

}