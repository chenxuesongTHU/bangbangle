// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  openId = event.openId
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
  _profileImgPath = dataList.data[0].profileImgPath
  _qrImgPath = dataList.data[0].qrImgPath
  _building = dataList.data[0].buildingIndex
  _name = dataList.data[0].name
  _gender = dataList.data[0].gender
  _idImgPath = dataList.data[0].idImgPath
  _phone = dataList.data[0].phone
  return {
    'profileURL': _profileImgPath,
    'qrImgPath': _qrImgPath,
    'idImgUrl': _idImgPath,
    'name': _name,
    'building': _building,
    'gender': _gender,
    'phone': _phone,
  }
}