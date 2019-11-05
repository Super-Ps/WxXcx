
Page({
    data: {
        tipsError: '',
        showTopTips: false,
        error: "",

        isAgree: false,
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
