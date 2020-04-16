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
  name = dataList.data[0].name
  gender = dataList.data[0].gender
  buildingIndex = dataList.data[0].buildingIndex
  room = dataList.data[0].room

  return{
    'name': name,
    'gender': gender,
    'buildingIndex': buildingIndex,
    'room': room
  }


}