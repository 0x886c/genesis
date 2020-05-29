//Component Object
Component({
  options: {
    multipleSlots: true
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
    evaacess: false,
    evalist: [],
    stars: [0, 1, 2, 3, 4],
    selectedSrc: '../../icons/star-s.png',
    normalSrc: '../../icons/star.png',
    doc: {},
    openid: ''
  },
  methods: {
    hideEva: function () {
      this.setData({
        flag: true
      })
    },
    showEva: function () {
      var that = this
      wx.cloud.database().collection('documents').doc(this.properties.paramtoev).get({
        success: res => {
          that.setData({
            flag:false,
            evalist: res.data.evalist
          })
          for (let i = 0; i < that.data.evalist.length; i++) {
            if (that.data.openid === that.data.evalist[i] && i == 0) {
              console.log('不能评价')
              that.setData({
                evaacess: true
              }),
                wx.showToast({
                  title: '对不起您不能对自己的文案进行评价',
                  duration: 2500,
                  icon: 'none'
                })
            } else if (that.data.openid === that.data.evalist[i]) {
              wx.showToast({
                title: '对不起您不能对已评价的文案再次进行评价',
                duration: 2500,
                icon: 'none'
              }),
              that.setData({
                evaacess: true
              })
            }
          }
        }
      })
    },
    
    /* 提交文案分数 */
    submitstar: function (e) {
      var that = this
      console.log(e)
      let id = e.currentTarget.dataset.id
      console.log('评价得分' + this.data.score)
      let testlist=[that.data.openid]
      this.data.evalist.push(testlist[0])
      console.log(this.data.evalist)
      wx.cloud.database().collection('documents').doc(id).get({
        success: res => {
          that.setData({
            id: res.data.id,
            sum: res.data.sum + that.data.score,
            num: res.data.num + 1,
            count: (res.data.sum + that.data.score) / (res.data.num + 1),
          })
          /* 云函数更改数据库可以越过创建者权限 */
          wx.showModal({
            title:'评价确认',
            confirmColor:'#576B95',
            content:'你选择的分数:'+that.data.score,
            success:res=>{
              if(res.confirm){
                wx.cloud.callFunction({
                  name: 'changecount',
                  data: {
                    id: id,
                    sum: that.data.sum,
                    num: that.data.num,
                    count: that.data.count,
                    evalist: that.data.evalist
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
              }
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
    },
    getOpenid: function () {
      var that = this
      wx.cloud.callFunction({
        name: "getOpenid",
        success: res => {
          that.setData({
            openid: res.result.openid
          })
        }
      })
    },
  },
  created: function () {
    this.getOpenid()
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