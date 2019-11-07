//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    zh: '',
    mm: '',
    motto: 'Hello 3333World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mottoa:'typedd',
    nickName:'nickName',
    error: false

  },

  getPhoneNumber(e){
    console.log('手机',e)
  },
  bindinputFn: function (e) {
    this.setData({
      [e.currentTarget.dataset.arg]: e.detail.value
    })
  },
  userSubmit: function () {
    const that = this
    const {zh, mm} = this.data

    wx.request({
      url: 'http://192.168.1.102:8088/tms-web/gateway/wechat/bind.do',
      // data: {
      //   bindName: this.data.userInfo.nickName,
      //   userName: zh,
      //   password: mm
      // },
      success: function (res) {
        console.log('bind.do:', res)
        if(res.data.code !== 200) {
          that.handlerError('接口调用失败')
        }
      },
      fail: function (err) {
        console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
        callback(err)
      }
    })
    
  },
  handlerError: function (error) {
    this.setData({
      error
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // //登录
    // wx.login({
    //   success: function (data) {
    //     wx.request({
    //       url: openIdUrl,
    //       data: {
    //         code: data.code,
    //         appid: 'wxce0321505ba7122b',
    //         secret: '6939a6d09c0e1b2f76bda0a84aea220b',
    //         grant_type: 'authorization_code'
    //       },
    //       success: function (res) {
    //         self.globalData.openid = res.data.openid
    //       },
    //       fail: function (res) {
    //         console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
    //       }
    //     })
    //   },
    //   fail: function (err) {
    //     console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
    //     callback(err)
    //   }
    // })


    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     console.log('getUserInfo', res)
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       console.log('getUserInfo', res)
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goHome: function(){
    wx.navigateTo({
      url: '../homefrom/homefrom'
    })
  }
})
