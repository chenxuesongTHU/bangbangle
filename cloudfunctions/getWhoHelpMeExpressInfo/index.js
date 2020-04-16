// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  openId = event.userInfo.openId

  // 先取出快递信息为false的所有快递，然后取出该用户的profile


  try {
    expressList = await db.collection('expressInfo')
      .where({
        status: true,
        // isAuthorized: false,
        openId: openId
      })
      .orderBy('insertTime', 'desc').skip(0).limit(30).get()
  } catch (e) {
    console.error(e)
  }
  // return expressList
  // _profileImgPath = dataList.data[0].profileImgPath
  for (let i in expressList.data) {
    fetchManOpenId = expressList.data[i].fetchMan
    // return fetchManOpenId
    var res = await cloud.callFunction({
      // 要调用的云函数名称
      name: 'getProfileUrlNameBuilding',
      // 传递给云函数的参数
      data: {
        'openId': fetchManOpenId
      }
    })
    // return res.result
    var profileURL = res.result.profileURL
    var name = res.result.name
    var gender = res.result.gender

    expressList.data[i]['profileUrl'] = profileURL
    expressList.data[i]['name'] = name
    expressList.data[i]['gender'] = gender
  }


  return expressList.data

}