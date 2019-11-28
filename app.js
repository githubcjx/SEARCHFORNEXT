//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
  },
  globalData: {
    userInfo: null,
    host: "https://swe16.club",
    appid: 'wxb5a5fe108456a968',
    secret: '4915a9ef2ec1b12c014a4b35b58a66b2',
    house_id: null
  }
})