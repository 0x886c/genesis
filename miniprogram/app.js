//app.js
App({
  onLaunch: function () {
   wx.cloud.init({
     env:'genesise-emzm0',
     traceUser:true
   })
  }
})
