// pages/test/test.js
Page({
  data:{
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