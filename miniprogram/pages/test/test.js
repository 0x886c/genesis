// pages/test/test.js
Page({
  data:{
    circle:[1,2,3,4,5,6,7,8,9]
  },

  onReady:function(){
    this.evaluate=this.selectComponent("#evaluate")
  },
  showEva(){
    this.evaluate.showEva()
  },
  _error(){
    console.log('你点击了取消')
    this.evaluate.hideEva()
  },
  _success(){
    console.log('你点击了确认')
    this.evaluate.hideEva()
  }
})