// 获取服务器接口地址
const api = require('../../config/config');


// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  formSubmit: function (e) {

  //  const that = this
  //  console.log('this==',this,'that',that)
   this.doLogin()
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

  doLogin:function(){
    wx.login({
      success: function (data) {
        console.log('data@@@code',data)
        console.log('code222',data.code)
          wx.request({
             method:'POST',
             url: api.getOpenId,
             data: {
             code: data.code,
             appid: 'wxce0321505ba7122b',
             secret: '10c1f3dac03673032492752add69869a',
             grant_type: 'authorization_code'
            },
          success: function (resAAAA) {
            console.log('@@@@@res',resAAAA)
           app.globalData.openid = resAAAA.data.openid
            },
          fail: function (res) {
             console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
            }
              })
         },
     fail: function (err) {
       console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
       callback(err)
     }
})
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