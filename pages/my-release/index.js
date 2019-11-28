var app = getApp();
var util = require('../../utils/util.js');
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    releaseList: []
  },
  onLoad() {
    const openid = wx.getStorageSync('openid');
    util.request(app.globalData.host + '/house/getRelease', {
      openid
    }, 'POST').then(res => {
      var releaseList = res.data;
      console.log(releaseList)
      this.setData({
        releaseList
      })
    })
  }
})