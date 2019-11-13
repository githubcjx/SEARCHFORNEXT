var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    num: 6,
    list: []
  },
  houseDetail(e) {
    var house_id = e.currentTarget.dataset.houseid
    wx.navigateTo({
      url: "../house-detail/index?house_id=" + house_id
    });
  },
  onLoad: function () {
    util.request(app.globalData.host + '/house/list', {}, 'POST').then(res => {
      var list = res.data;
      this.setData({
        list
      })
    })
  },
  onShow: function () {
    util.request(app.globalData.host + '/house/list', {}, 'POST').then(res => {
      var list = res.data;
      this.setData({
        list
      })
    })
  }
})