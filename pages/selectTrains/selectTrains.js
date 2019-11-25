const app = getApp()
const api  = require("../../config/config");
// pages/selectTrains/selectTrains.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    list : [],
    stationTrainCode:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that  = this 
    wx.setNavigationBarTitle({
      title: '备选车次'
    })
    console.log('options',options)
    wx.showLoading({title: '加载中', icon: 'loading', duration: 10000});
    wx.request({
      url: api.selectOlder,
      data: {
        fromStation:options.startCityName,
        toStation:options.endCityName,
        trainDate:options.riqi
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){

        const dataParse = JSON.parse ( res.data.data )
        that.setData({
          list : dataParse.data
        })
        console.log('list',that.data.list)
        wx.hideLoading()
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
       // wx.hideToast()
      }
    })
  },

  checkboxChange : function(e){
    console.log('e',e)

    // var pages = getCurrentPages();
    // console.log('pages',pages)
    // var prevPage = pages[pages.length - 2]; //上一个页面
    // console.log('prevPage',prevPage)
    //  //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    // prevPage.setData({
    //      mydata: {
    //        id:1,
    //        stationTrainCodeA: e.detail.value
    //      }
    //    })

    this.setData({
      stationTrainCode: e.detail.value
    })
    console.log('stationTrainCode!!!',this.data.stationTrainCode)
    
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

  },
  submit () {

    var pages = getCurrentPages();
    console.log('pages',pages)
    var prevPage = pages[pages.length - 2]; //上一个页面
    console.log('prevPage',prevPage)
     //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({

           stationTrainCodeA: this.data.stationTrainCode
         }
       )
       wx.navigateBack({//返回
         delta: 1  
       })
    // wx.navigateBack({
    //   url: `../settingpage/set?stationTrainCode=${this.data.stationTrainCode}`
    // })
  }
})