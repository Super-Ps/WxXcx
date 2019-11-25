
Component({
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  ready() {
    this.setData({
      items: [
        { name: '一等座', check: false},
        { name: '二等座', check: false },
        { name: '商务座', check: false }
      ]
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
    choose: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

    cancel() {
      this.setData({
        show: false
      })
    },
    submit() {
      this.triggerEvent('getSeat', this.data.choose)
      this.setData({
        show: false
      })
    },
   
    checkboxChange(e) {
      let value = e.detail.value
      let it = [...this.data.items]
        it.forEach((i, n) => {
          if (value.some((s) => {
            return i.name === s
          })) {
            i.check = true
          } else {
            i.check = false
          }
        })
        this.setData({
          items: it,
          choose: value
        })
     
    }
  }
})