// pages/query/query.js
let City = require('../../utils/allcity.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: City,
    cityType: '',
    config: {
      horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
      animation: true, // 过渡动画是否开启
      search: true, // 是否开启搜索
      searchHeight: 45, // 搜索条高度
      suctionTop: true // 是否开启标题吸顶
    },
    
    showCity: false,
    startCityName:'深圳',
    endCityName:'长沙',

    date:'2019-11-25',

  },
  queryformData:{
    radio: '0'
  },


  bindDateChange: function (e) {
    console.log('bindDateChange', e)
    this.setData({
      date: e.detail.value,
   //   [`formData.ccdate`]: e.detail.value
    })
  },

  goCity: function (e) {
    console.log('goCity',e)
    this.setData({
      showCity: true,
      cityType: e.currentTarget.dataset.type
    })
  },

  binddetail(e) {
    console.log('binddetail', e.detail)
    if(this.data.cityType === '0'){
      this.setData({
        showCity: false,
        [`queryformData.startCity`]: e.detail.name,
        startCityName: e.detail.name
      })
    }
     if (this.data.cityType === '1') {
       this.setData({
         showCity: false, 
         [`queryformData.endCity`]: e.detail.name,
         endCityName: e.detail.name
       })
     }
    
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})