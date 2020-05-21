
Page({

  data: {
    list: [],
    getlist: [],
    num: 0,
    sum: 0,
    count: 0,
    stars: [0, 1, 2, 3, 4],
    selectedSrc: '../../icons/star-s.png',
    normalSrc: '../../icons/star.png',
    score: 0,
    scores:[]
  },
  onLoad: function () {
    this.evaluate = this.selectComponent("#evaluate")
    console.log(this)
    this.getList()
  },
  _error() {
    console.log('你点击了取消')
  },
  _success() {
    console.log('你点击了确认')
  },
  input: function (e) {
    this.search(e.detail.value)
  },
  /* 获取数据库信息 */
  getList: function () {
    var that = this
    wx.cloud.database().collection('documents').get({
      success: res => {
        console.log(res.data)
        that.setData({
          list: res.data
        })
      }
    })
  },
  /* 搜索数据，将搜索的结果保存至getlist列表 */
  search: function (skey) {
    console.log(skey)
    var that = this
    var list = this.data.list
    var getlist = []
    var arr = []
    for (let i = 0, l = list.length; i < l; i++) {
      if (list[i].filename.indexOf(skey) >= 0) {
        arr.push(list[i])
      }
    }
    if (arr.length == 0) {
      that.setData({
        getlist: [{ filename: '未找到搜索结果' }]
      })
    } else {
      that.setData({
        getlist: arr
      })
    }
    if (skey == '') {
      that.setData({
        getlist: []
      })
    }
    console.log(getlist)
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