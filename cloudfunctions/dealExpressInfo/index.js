// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  colorIndex = event.colorIndex
  expressCompanyIndex = event.expressCompanyIndex
  locationIndex = event.locationIndex
  sizeIndex = event.sizeIndex
  stringCode = event.stringCode
  openId = event.userInfo.openId
  var mssg

  const db = cloud.database()
  const expressInfo = db.collection('expressInfo')
  // expressInfo.add({
    // data:{
    //   "openId": openId,
    //   "locationIndex": locationIndex,
    //   "expressCompanyIndex": expressCompanyIndex,
    //   "colorIndex": colorIndex,
    //   "stringCode": stringCode,
    //   "sizeIndex": sizeIndex,
    //   "insertTime": db.serverDate(),
    //   "status": false
    // },
  //   success: function (res) {
  //     mssg = res
  //   },
  //   fail: function(res){
  //     messg = res
  //   }
  // })
  try {
    return await db.collection('expressInfo').add({
    // data 字段表示需新增的 JSON 数据
      data: {
        "openId": openId,
        "locationIndex": locationIndex,
        "expressCompanyIndex": expressCompanyIndex,
        "colorIndex": colorIndex,
        "stringCode": stringCode,
        "sizeIndex": sizeIndex,
        "insertTime": db.serverDate({ offset: 8 * 60 * 60 * 1000 }),
        "status": false,
        "isAuthorized": false,
        "fetchMan":null,
      }
  })
  }catch(e){
    console.log(e)
  }

}