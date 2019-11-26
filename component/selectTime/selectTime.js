// component/selectTime/selectTime.js
Component({
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行

    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  ready() {
    console.log('Component')

    let itemsnew = []
    let now = new Date().getTime();
    let i = 0
    while (i < 61) {
      let p = {
        check: false,
        describe: this.formatDes(now + i * (1000 * 60 * 60 * 24), i),
        date: this.format(now + i * (1000 * 60 * 60 * 24))
      }
      itemsnew.push(p)
      i++
    }
    this.setData({
      items: itemsnew
    })
  },
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [],
    chooseDete: []
   

  },

  /**
   * 组件的方法列表
   */
  methods: {
  
    cancel () {
      this.setData({
        show: false
      })
    },
    submit () {
      this.triggerEvent('getDates', this.data.chooseDete)
      this.setData({
        show: false
      })
    },
    adds(m) {
      return m < 10 ? '0' + m : m
    },
    formatDes(v, index) {
      let a = ''
      let d = new Date(v).getDay()
      switch (d) {
        case 1:
          a = '周一'
        break
        case 2:
          a = '周二'
          break
        case 3:
          a = '周三'
          break
        case 4:
          a = '周四'
          break
        case 5:
          a = '周五'
          break
        case 6:
          a = '周六'
          break
        case 0:
          a = '周日'
          break
        
      }
      if (index === 0){
        a = '今天'
      }
      if (index === 1){
        a = '明天'
      }
      return a
    },
    format(shijianchuo) {

      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      return  y + '-' + this.adds(m) + '-' + this.adds(d)
    },
    checkboxChange(e) {
      console.log('checkboxChange',e)

      let value = e.detail.value
      let it = [...this.data.items]
      if (value.length < 4) {
        it.forEach((i, n) => {
          if (value.some((s) => {
              return i.date === s
            })) {
            i.check = true
          } else {
            i.check = false
          }
        })
        this.setData({
          items: it,
          chooseDete: value
        })
      } else {
        this.setData({
          items: it
        })
      }
    }
  }
})