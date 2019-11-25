//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    console.log('app  onlaunch!!')
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log('app login',res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

     // 检查本地 storage 中是否有登录态标识
     checkLoginStatus: function () {
      let that = this;
      let loginFlag = wx.getStorageSync('loginFlag');
      if (loginFlag) {
          // 检查 session_key 是否过期
          wx.checkSession({
              // session_key 有效(为过期)
              success: function () {
                  // 直接从Storage中获取用户信息
                  let userStorageInfo = wx.getStorageSync('userInfo');
                  if (userStorageInfo) {
                      that.globalData.userInfo = JSON.parse(userStorageInfo);
                  } else {
                      that.showInfo('缓存信息缺失');
                      console.error('登录成功后将用户信息存在Storage的userStorageInfo字段中，该字段丢失');
                  }

              },
              // session_key 过期
              fail: function () {
                  // session_key过期
                  that.doLogin();
              }
          });
      } else {
          // 无登录态
          that.doLogin();
      }
  },
   
  globalData: {
    userInfo: null
  }
})