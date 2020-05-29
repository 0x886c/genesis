// miniprogram/pages/index/index.js
Page({
  /* 监听页面显示 */
  data: {
    newdoc: [],
    num: 0,
    sum: 0,
    count: 0,
    stars: [0, 1, 2, 3, 4],
    selectedSrc: '../../icons/star-s.png',
    normalSrc: '../../icons/star.png',
    score: 0
  },
  onShow: function () {
    this.getnewdoc()
    console.log(this)
  },
  onLoad: function () {
    this.evaluate = this.selectComponent("#evaluate")
    console.log(this)
  },
  _error() {
    console.log('你点击了取消')
  },
  _success() {
    console.log('你点击了确认')
    this.getnewdoc()
  },
  /* 转发分享 */
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '创e行小程序',
      path: 'pages/index/index',
      success: function (res) {
        console.log("转发成功:" + JSON.stringify(res));
        that.shareClick();
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  /* 获取最新文案 */
  getnewdoc: function () {
    var that = this
    var arr = []
    wx.cloud.database().collection('documents').get({
      success: res => {
        console.log(res)
        for (let i = res.data.length - 1; i > res.data.length - 6 && i >= 0; i--) {
          arr.push(res.data[i])
        }
        that.setData({
          newdoc: arr
        })
        that.setData({
          count: count.toFixed(2)
        })
      },
      fail: console.error
    })
  },
  /* 云存储下载保存至本地临时路径，预览文档 */
  preview: function (e) {
    console.log(e)
    let fileid = e.currentTarget.dataset.id
    wx.showLoading({
      title: '正在加载预览',
    });
    wx.cloud.downloadFile({
      fileID: fileid,
      //成功回调函数
      success: (result) => {
        console.log(result)
        wx.openDocument({
          filePath: result.tempFilePath,
        });
      },
      //失败回调函数
      fail: () => { console.error },
      //结束回调函数
      complete: () => { wx.hideLoading(); }
    });
  },

})