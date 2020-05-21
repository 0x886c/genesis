// pages/login/login.js
Page({
  /* 在此处完成用户授权 */
  Bindgetuserinfo(res) {
    if (res.detail.userInfo) {
      console.log("点击了同意授权");
      wx.showToast({
        title:'授权成功',
        icon:'success',
        duration:1500,
        mask:false,
      }),
      /* 哦！在这儿停顿！ */
      setTimeout(() => {
          wx.switchTab({
          url: '../mine/mine',
        });
      }, 1500);
    } else {
      console.log("点击了拒绝授权");
    }
  },
})