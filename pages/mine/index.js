var app = getApp();
var util = require('../../utils/util.js');
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    isLogin: false,
    show: false
  },
  getUserInfo: function(res) {
    var userInfo = res.detail.userInfo;
    var isSuccess = res.detail.errMsg == 'getUserInfo:ok' ? true : false;

    if (isSuccess) {
      util.login().then(res => {
        Toast.loading({
          mask: true,
          message: '正在登录',
          duration: 0
        });
        util.request(app.globalData.host + '/user/login', {
          code: res.code,
          userInfo,
          ctime: util.parseTime(new Date().getTime())
        }, 'POST').then(res => {
          console.log(res);
          if (res.code == 200) {
            wx.setStorageSync('userInfo', res.data);
            wx.setStorageSync('token', res.data.token);
            wx.setStorageSync('openid', res.data.openid);
            this.setData({
              isLogin: true
            })
          }
          Toast.clear();
        })
      })
    } else {
      Toast.fail('登录失败');
    }
  },
  onLoad: function() {
    var token = wx.getStorageSync('token');
    if (token) {
      this.setData({
        isLogin: true
      })
    }
  },
  islogin() {
    var isLogin = wx.getStorageSync('openid');
    if (isLogin) {
      return true;
    } else {
      return false;
    }
  },
  onMyCollection() {
    if (this.islogin()) {
      wx.navigateTo({
        url: '../collection/index'
      })
    } else {
      Toast.fail('请先登录');
    }
  },
  onRecord() {
    wx.navigateTo({
      url: '../record/index'
    })
  },
  onMyRelease: function() {
    if (this.islogin()) {
      wx.navigateTo({
        url: '../my-release/index'
      })
    } else {
      Toast.fail('请先登录');
    }
  },
  onRelease: function() {
    if (this.islogin()) {
      wx.navigateTo({
        url: '../house-release/index'
      })
    } else {
      Toast.fail('请先登录');
    }
  },
  logout: function() {
    this.setData({
      show: true
    })
  },
  confirmLogout: function() {
    this.setData({
      isLogin: false
    });
    wx.clearStorage()
  }
})