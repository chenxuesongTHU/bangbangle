// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  campusAbbreviate = event.campusAbbreviate
  const db = cloud.database()

  try {
    buildingList = await db.collection('campusInfo')
      .where({
        campusAbbreviate: campusAbbreviate,
      })
      .get()
  } catch (e) {
    console.error(e)
  }
  // _profileImgPath = dataList.data[0].profileImgPath
  

  return buildingList.data[0].building
}