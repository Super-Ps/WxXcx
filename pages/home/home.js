// pages/home/home.js
// 导入数据，可以ajax获取
let City = require('../../utils/allcity.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   /**
    * citycomponent
    */
    city: City,
    cityType: '',
    config: {
      horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
      animation: true, // 过渡动画是否开启
      search: true, // 是否开启搜索
      searchHeight: 45, // 搜索条高度
      suctionTop: true // 是否开启标题吸顶
    },

    /**
     * home
     */
    showCity: false,
    startCityName: '',
    endCityName: '',
    date: "",
    error: "",

    radioItems: [
      { name: '刷票', value: '0', checked: true },
      { name: '候补刷票', value: '1', checked: false }
    ],
    index: 0,
    array: ['特等座: P', '特等座: P', '二等座: O', '硬座: 1', '无座: 1', '软座: 2', '软卧: 3', '硬卧: 4'],
    formData: {
      radio: '0'
    },
    rules: [
      {
        name: 'startCity',
        rules: { required: true, message: '始发站是必选项' },
      }, {
        name: 'endCity',
        rules: { required: true, message: '到达站是必选项' },
      }, {
        name: 'ccdate',
        rules: { required: true, message: '乘车日期是必选项' },

      }, {
        name: 'ccinfoemation',
        rules: { required: true, message: '车次信息必选项' },
      },
      {
        name: 'cctype',
        rules: { required: true, message: '席位是必选项' }
      },


    ],
  },


  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      [`formData.radio`]: e.detail.value
    });
  },
  submitForms: function () {
    const that = this
    console.log('formData++', that.data.formData)
    this.selectComponent('#form1').validate((valid, errors) => {
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

  submitHttp: function () {

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
          url: '../test/test',
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

  bindDateChange: function (e) {
    console.log('bindDateChange', e)
    this.setData({
      date: e.detail.value,
      [`formData.ccdate`]: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      city: City
    })



    console.log('+++2222', options)
    if(options.type === '0') {
      this.setData({
        startCityName: options.city
      })
    }
    if (options.type === '1') {
      this.setData({
        endCityName: options.city
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      date: '2019-10-02',
      [`formData.ccdate`]: '2019-10-02',
      [`formData.cctype`]: '特等座: P'
    })
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
  formInputChange: function (e) {
    console.log('!!!$', e)
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  goCity: function (e) {
    console.log('eee',e)
    this.setData({
      showCity: true,
      cityType: e.currentTarget.dataset.type
    })
  },
   binddetail(e) {
    console.log('binddetail', e.detail)
    if(this.data.cityType === '0'){
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


})