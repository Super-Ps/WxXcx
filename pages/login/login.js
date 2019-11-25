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
    upwd:'',
    tel:'',
    nickName:''
  },

  formSubmit: function (e) {

  //  const that = this
  //  console.log('this==',this,'that',that)
  // this.doLogin()
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if(!e.detail.value.uname ){
      wx.showToast({
        title: '账号必填',
        icon: 'success',
        duration: 2000
      })
      
    }
    if(!e.detail.value.upwd ){
      wx.showToast({
        title: '密码必填',
        icon: 'success',
        duration: 2000
      })
    }
    this.setData({
      uname :e.detail.value.uname,
      upwd : e.detail.value.upwd,
      tel:e.detail.value.tel,
    //  email:e.detail.value.email
    }
    )
    console.log('&&&&&&&',this.data.nickName,this.data.uname,this.data.upwd,this.data.tel,this.data.email)
    this.bindOpenKey(this.data.nickName,this.data.uname,this.data.upwd,this.data.tel,this.data.email)

  },


bindOpenKey : function(nickName,uname,upwd,tel,email){
  if(app.globalData.openkey){
  //  console.log('key',app.globalData)

    console.log('id,',app.globalData.openkey.openid,'key',app.globalData.openkey.session_key)
    wx.request({
      url: api.bind,
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openId:app.globalData.openkey.openid,
        sessionKey:app.globalData.openkey.session_key,
        bindName:nickName,
        userName: uname,
        password : upwd ,
        tel:tel,
        email:email

      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log('通过open——id拿后台登录状态',res)
      },
      fail: function(res) {
        // fail
        console.log('通过open——id登录失败',res)
      },
      complete: function() {
        // complete
      }
    })
  }
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录12306账号'
    })

    var that = this;
 
    //通过code信息后获取open_id
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
              console.log('获取openkey',res)
              // wx.showToast({
              //   title: '成功',
              //   icon: 'success',
              //   duration: 2000
              // }) 
              app.globalData.openkey = res.data.data
              console.log('pp.globalData.openkey ',app.globalData.openkey )
              wx.getUserInfo({
              
                success: function(res){  
                  console.log('info',res)      
                  that.setData({
                    nickName:res.userInfo.nickName
                  })
                },
                fail: function() {
                  console.log('获取昵称失败')
                },
              })
             console.log('app.globalData',app.globalData)
            //获取用户信息
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