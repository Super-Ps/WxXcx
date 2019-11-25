// pages/settingpage/set.js
let City = require('../../utils/allcity.js');
const app = getApp()
const api  = require("../../config/config");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stationTrainCodeA:'',
    startCityName: '上海',
    endCityName: '北京',
    riqi: '',
    checi: '',
    zuoxi: '',
    mobile: '',
    usernmae:'',
    showCity: false,
    showDatePick: false,
    showSeat: false,
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
    console.log('options-set.js',options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(options) {
    console.log('options-set.js222',options)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (onShow) {
    console.log('onShow', onShow)
//     let pages = getCurrentPages();

 
//     let currPage = pages[pages.length - 1];
//     console.log('currPage-',currPage)
 
//     if (currPage.data.stationTrainCodeA) {
//       console.log('22222---',currPage.data.stationTrainCodeA)
 
//         this.setData({
 
//             //将携带的参数赋值
 
//             stationTrainCodeA: currPage.data.stationTrainCodeA,
 
//             
 
//       });
 
//     console.log(this.data.stationTrainCodeA, 'stationTrainCodeA')
 
//   }
},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function(options) {
    console.log('hohide',options)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function(options) {
    console.log('onUnload',options)
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
 
  bindKeyInput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
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
      url: `../selectTrains/selectTrains?startCityName=${this.data.startCityName}&endCityName=${this.data.endCityName}&riqi=${this.data.riqi}`
    
    })
  },
  loginPage(){
    wx.navigateTo({
      url: '../login/login',
      success: function(res){
        // successc
        console.log('登录页面成功')
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
        console.log('是否成功始终执行1次')
      }
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

  },
  selectSeat () {
    this.setData({
      showSeat: true
    })
  },
  getSeat (v) {
    this.setData({zuoxi: v.detail})
    console.log('选择坐席：', this.data.zuoxi.toString())
  },

  usernameInput(e){
    console.log(e)
    this.setData({
      usernmae : e.detail.value
    })
  },

  submitFrom (){
    wx.request({
      url: api.order,
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openId: app.globalData.openkey.openid,   
        members: this.data.usernmae,  //  乘车人
        tranDates: this.data.riqi,  // 时间
        tranNumbers: this.data.stationTrainCodeA,  // 购票车次以,号分割
        fromStation: this.data.startCityName,  //出发站
        toStation: this.data.endCityName,  // 到达站
        seats: this.data.zuoxi    ,// 座席
        tel:this.data.mobile
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log('下单接口返回',res)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }

  

})