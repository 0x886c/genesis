//Component Object
Component({
  options:{
    multipleSlots:true
  },
  properties: {
    paramtoev: String,
    title: {
      type: String,
      value: '请你为此文案打分'
    },
    canceltext: {
      type: String,
      value: '取消'
    },
    choosetext: {
      type: String,
      value: '确定'
    }

  },
  data: {
    flag: true,
    stars: [0, 1, 2, 3, 4],
    selectedSrc: '../../icons/star-s.png',
    normalSrc: '../../icons/star.png',
    doc: {}
  },
  methods: {
    hideEva: function () {
      this.setData({
        flag: true
      })
    },
    showEva: function () {
      this.setData({
        flag: false
      })
    },
    /* 提交文案分数 */
    submitstar: function (e) {
      var that = this
      console.log(e)
      let id = e.currentTarget.dataset.id
      console.log('评价得分' + this.data.score)
      wx.cloud.database().collection('documents').doc(id).get({
        success: res => {
          that.setData({
            id: res.data.id,
            sum: res.data.sum + this.data.score,
            num: res.data.num + 1,
            count: (res.data.sum + this.data.score) / (res.data.num + 1)
          })
          /* 云函数更改数据库可以越过创建者权限 */
          wx.cloud.callFunction({
            name: 'changecount',
            data: {
              id: id,
              sum: that.data.sum,
              num: that.data.num,
              count: that.data.count
            },
            success: res => {
              wx.showToast({
                title: '评价成功',
                icon: 'success',
                duration: 1500,
                mask: false,
              });
              that._success()
              console.log(res)
            },
            fail: res => {
              console.log(res)
            }
          })
          console.log(that.data.count)
        }, fail: console.error
      })
    },
    select: function (e) {
      var score = e.currentTarget.dataset.score
      this.setData({
        score: score
      })
      console.log(score)
    },
    _error() {
      wx.showToast({
        title: '取消',
        icon: 'success',
        duration: 1500,
        mask: false,
      });
      this.triggerEvent("error")
      this.hideEva()
    },
    _success() {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1500,
        mask: false,
      });
      this.triggerEvent("success")
      this.hideEva()
    }
  },
  created: function () {

  },
  attached: function () {

  },
  ready: function () {

  },
  moved: function () {

  },
  detached: function () {

  },
});