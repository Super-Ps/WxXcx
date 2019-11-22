// pages/settingpage/set.js
let City = require('../../utils/allcity.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startCityName: '上海',
    endCityName: '北京',
    riqi: '',
    checi: [],
    zuoxi: [],
    mobile: '',
    showCity: false,
    showDatePick: false,
    city: City,
    cityConfig: {
      horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
      animation: true, // 过渡动画是否开启
      search: true, // 是否开启搜索
      searchHeight: 45, // 搜索条高度
      suctionTop: true // 是否开启标题吸顶
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '抢票设置'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getDates(v) {
    this.setData({riqi: v.detail})
    console.log('选择日期：', this.data.riqi.toString())
  },
  selectDate() {
    this.setData({
      showDatePick: true
    })
  },
  selectTrains() {
    wx.navigateTo({
      url: '../selectTrains/selectTrains'
    
    })
  },
  goCity(e) {
    console.log('eee', e)
    this.setData({
      showCity: true,
      cityType: e.currentTarget.dataset.type
    })
  },
  binddetail(e) {
    console.log('binddetail', e.detail)
    if (this.data.cityType === '0') {
      this.setData({
        showCity: false,
        [`formData.startCity`]: e.detail.name,
        startCityName: e.detail.name
      })
    }
    if (this.data.cityType === '1') {
      this.setData({
        showCity: false,
        [`formData.endCity`]: e.detail.name,
        endCityName: e.detail.name
      })
    }

  }

})