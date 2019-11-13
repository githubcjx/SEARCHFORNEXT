var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    list: []
  },
  onLoad: function() {
    var openid = wx.getStorageSync('openid');
    util.request(app.globalData.host + '/house/collection', {
      openid
    }, 'POST').then(res => {
      var list = res.data;
      console.log(res)
      this.setData({
        list
      })
    })
  },
  onCollection(e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.list;
    list[index].like = Math.abs(list[index].like - 1);
    var houseid = e.currentTarget.dataset.houseid;
    var openid = wx.getStorageSync('openid');
    util.request(app.globalData.host + '/house/like', {
      house_id: houseid,
      openid
    }, 'POST').then(res => {
      if (res.code == 200) {
        this.setData({
          list
        })
      }
    })
  }
})