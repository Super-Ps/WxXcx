//获取应用实例
const app = getApp()


Page({
    data: {
        tipsError: '',
        showTopTips: false,
        error: "",
        isAgree: false,
        userInfo: {},
        hasUserInfo: false,
        nickName:'nickName',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        formData: {

        },
        rules: [{
          name: 'account',
            rules: {required: true, message: '账号是必选项'},
        }, {
            name: 'pwd',
            rules: { required: true, message: '密码是必选项'},
        }, {
            name: 'email',
            rules: [{ required: true, message: '邮箱是必选项'},{
                email: true, message: '邮箱格式错误'
            }]
        }, {
            name: 'phone',
            rules: [{ required: true, message: '手机是必选项'}, {mobile: true, message: '手机格式不对'}],
        }]
    },

    onLoad:function(){

           wx.login({
               success: function (data) {
                 console.log('data@@@code',data)
                 console.log('code222',data.code)
                   wx.request({
                      method:'POST',
                      url: 'http://47.112.218.202:8090/gateway/wechat/getOpenId.do',
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

    getUserInfo: function(e) {
      console.log('eeee',e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },

    formInputChange:function(e) {
      console.log('!!!$',e)
        const {field} = e.currentTarget.dataset
        this.setData({
            [`formData.${field}`]: e.detail.value
        })
    },

  submitForm: function () {
    const that = this
    console.log('formData++', this.data.formData)
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        console.log('errors', errors)
        const firstError = Object.keys(errors)
       // console.log('firstError', firstError)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
          console.log('www', errors[firstError[0]].message)
          wx.showToast({
            icon: 'none',
            title: this.data.error
          })

        }
      } else {
        that.submitHttp()
      }
    })
  },
  
  handlerError: function (err) {
    this.setData({
      tipsError: err
    })
  },
  submitHttp : function (){
    console.log(
  '++++'
    )
    const that = this
    wx.request({
      url: 'https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=18813919799',
      // data: {
      //   bindName: this.data.userInfo.nickName,
      //   userName: this.data.formData.account,
      //   password: this.data.formData.pwd,
      //   phone: this.data.formData.account,
      //   email: this.data.formData.email
      // },
      success: function (res) {
        console.log('bind.do:', res)
        wx.navigateTo({
          url: '../home/home',
        })
        // if (res.data.__GetZoneResult_) {
        //  // that.handlerError('接口调用失败')

        // }
        
      },
      fail: function (err) {
        console.log('homefrom请求', err)
        // callback(err)
      }
    })
  },
  
});
