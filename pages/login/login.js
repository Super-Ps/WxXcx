// 获取服务器接口地址
const api = require('../../config/config');
const app = getApp()

// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname:'',

    upwd:''
  },

  formSubmit: function (e) {

  //  const that = this
  //  console.log('this==',this,'that',that)
  // this.doLogin()
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if(!e.detail.value.uname ){
      console.log('账号必填')
    }
    if(!e.detail.value.upwd ){
      console.log('密码必填')
    }
    this.setData({
      uname :e.detail.value.uname,
      upwd : e.detail.value.upwd
    }
    )
    
    


   // console.log('11',this.data)
    this.getOpenKey(this.data.uname,this.data.upwd)

    //this.data.uname=
  },

  getOpenKey:function(uname,upwd){
    
    wx.login({
      
      success: function (data) {
        console.log('data@@@code',data)
        console.log('code222',data.code)
          wx.request({
             url: api.getOpenId,
             data: {
             code: data.code,
             appid: 'wxce0321505ba7122b',
             secret: '10c1f3dac03673032492752add69869a',
             grant_type: 'authorization_code'
            },
            success: function (res) {
              console.log('@@@@@res',res)
              
            //  this.bindOpenKey(uname,upwd,res)
              this.getUserInfo()
              
            //  console.log('app.globalData',app.globalData)
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
  bindOpenKey:function(uname,upwd,res){
    if(res.data.data){
      app.globalData.openkey = res.data.data
      wx.request({
        url: api.bind,
        data: {

          open_id:app.globalData.openkey.open_id,
          sessionKey:app.globalData.openkey.sessionKey,
          bindName :'',
          userName: uname,
          password : upwd 

        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  },

  getUserInfo: function() {
    let that = this;

    let userInfo = app.globalData.userInfo;

    console.info('userInfo is:', userInfo);

    // if (userInfo) {
    //     that.setData({
    //         hasLogin: true,
    //         userInfo: userInfo
    //     });
    //   //  wx.hideLoading();
    // } else {
    //     console.log('globalData中userInfo为空');
    // }
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