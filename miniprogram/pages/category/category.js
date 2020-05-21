Page({

  data: {
    list: ['分类1', '分类2', '分类3', '分类4'],
    catedoc: [],
    num: 0,
    sum: 0,
    count: 0,
    stars: [0, 1, 2, 3, 4],
    selectedSrc: '../../icons/star-s.png',
    normalSrc: '../../icons/star.png',
    score: 0,
  },
  /* 打分组件 */
  onLoad: function () {
    this.evaluate = this.selectComponent("#evaluate")
    console.log(this)
  },
  _error() {
    console.log('你点击了取消')
  },
  _success() {
    console.log('你点击了确认')
  },
  /* 点击后获取分类数据 */
  clickTab: function (e) {
    var that = this
    console.log(e)
    let select = e.currentTarget.dataset.selectchara
    wx.cloud.database().collection('documents').where({
      character: select
    }).get({
      success: res => {
        that.setData({
          catedoc: res.data
        })
      }
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
      success: (result) => {
        console.log(result)
        wx.openDocument({
          filePath: result.tempFilePath,
        });
      },
      fail: () => { console.error },
      complete: () => { wx.hideLoading(); }
    });
  },
})