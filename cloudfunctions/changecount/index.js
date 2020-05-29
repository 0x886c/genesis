// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  var id=event.id
  var sum=event.sum
  var num=event.num
  var count=event.count
  var evalist=event.evalist
  return cloud.database().collection('documents').doc(id).update({
    data:{
      sum:sum,
      num:num,
      count:count,
      evalist:evalist
    }
  })
}