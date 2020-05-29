
Page({

  data: {
    character:'',
    openid:''
  },
  onLoad:function(){
    var that =this
    wx.cloud.callFunction({
      name:"getOpenid",
      success:res=>{
        console.log(res)
        that.setData({
          openid:res.result.openid
        })
      },fail:console.error
    })
  },
  bindChange:function(e){
    console.log(e.detail.value)
    this.setData({
      character:e.detail.value
    })
  },
  /* 上传文件 */
  uploadfile:function(){
    var that = this
    wx.chooseMessageFile({
      //默认只上传一个文案文档
      count:1,
      //支持word,pdf,ppt等多种文案格式
      type:'file',
      success(res){
        //获取文件名称
        const filename = res.tempFiles[0].name
        wx.showLoading({
          title: '正在上传...',
        });
        console.log(res)
        wx.cloud.uploadFile({
          //文件暂存路径及云存储路径
          filePath:res.tempFiles[0].path,
          cloudPath:'documents/'+Date.now()+res.tempFiles[0].name,
          //成功上传后新增数据库
          success:res=>{
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1500,
              mask: false,
            })
            console.log(res)
            const db = wx.cloud.database()
            const fileid = res.fileID
            db.collection('documents').add({
              data:{
                fileid:fileid,
                filename:filename,
                character:that.data.character,
                sum:0,
                num:0,
                count:0,
                evalist:[that.data.openid]
              }
            })
          },
          //显示失败提示
          fail:res=>{
            wx.showToast({
              icon:'none',
              title:'上传失败'
            })
          }
        })
      }
    })
  }
})