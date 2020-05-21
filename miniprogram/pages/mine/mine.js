
Page({
  data: {
    openid:'',
    mydoc:[]
  },
  onShow:function(){
    this.getdocfromopenid()
  },
  /* 删除自己上传的文档 */
  deletdoc:function(e){
    var that =this
    console.log(e)
    let id=e.currentTarget.dataset.id
    let fileid=e.currentTarget.dataset.fileid
    console.log(fileid)
    wx.showLoading({
      title:'正在删除',
    })
    wx.cloud.database().collection('documents').doc(id).remove({
      success:res=>{
        console.log(res)
        wx.cloud.deleteFile({
          fileList:[fileid],
          success:res=>{
            wx.showToast({
              title:'删除成功',
              icon:'success',
              duration:1500,
              mask:false
            })
          },
          fail:console.error
        })
      },
      complete:()=>{
        that.onShow()
      }
    })
  },
  /* 云存储下载保存至本地临时路径，预览文档 */
  preview:function(e){
    console.log(e)
    let fileid=e.currentTarget.dataset.fileid
    wx.showLoading({
      title: '正在加载预览',
    });
    wx.cloud.downloadFile({
      fileID:fileid,
      success: (result)=>{
        console.log(result)
        wx.openDocument({
          filePath: result.tempFilePath,
        });
      },
      fail: ()=>{console.error},
      complete: ()=>{wx.hideLoading();}
    });
  },
  /* 云函数获取openid保存至page中 */
  /* 并通过openid查找文案数据库 */
  getdocfromopenid:function(){
    var that = this
    wx.cloud.callFunction({
      name:'getOpenid',
      success:function(res){
        let openid=res.result.openid
        wx.cloud.database().collection('documents').where({
          _openid:openid
        }).get({
          success:res=>{
            console.log('已根据openid成功查找数据库')
            console.log(res.data)
            that.setData({
              openid:openid,
              mydoc:res.data
            })
          }
        })
      },
      fail:console.error
    })
  },
  navtoupload:function(){
    wx.navigateTo({
      url: '../upload/upload?that=this',
    });
  }
})