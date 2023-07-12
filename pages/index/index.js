//index.js
//获取应用实例
const app = getApp()
wx.setNavigationBarTitle({
  title: '安琪今天吃什么'
})
wx.cloud.init();
Page({
  data: {
    motto: '开始体验',
    userInfo: {},
    address:'未知',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showMask: false,
    showMaskBtn: false
  },
  
  //事件处理函数
  bindViewTap: function () {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'record',
      // 传给云函数的参数
      data: {
        type: 'try',
      },
    });
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindHuoGuo: function () {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'record',
      // 传给云函数的参数
      data: {
        type: 'huoguo',
      },
    });
    wx.navigateTo({
      url: '../user/index'
    });
  },
  bindOther: function () {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'record',
      // 传给云函数的参数
      data: {
        type: 'other',
      },
    });
    wx.navigateTo({
      url: '../about/index'
    })
  },
  onStartTap() {
    this.setData({
      showMask: false
    });
    
    wx.cloud.callFunction({
      // 云函数名称
      name: 'record',
      // 传给云函数的参数
      data: {
        type: 'start',
      },
    });
    // .then(res => {
    //   console.log(res.result) // 3
    // })
    // .catch(console.error)
    wx.setStorageSync('mask', '1');
  },
  onShow: function () {
    const cache = wx.getStorageSync('mask');
    if (cache !== '1') {
      this.setData({
        showMask: true
      });
      // wx.getStorageSync('mask', '1');
      setTimeout(() => {
        this.setData({
          showMaskBtn: true
        })
      }, 8000);
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
