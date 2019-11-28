var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    list: []
  },
  houseDetail(e) {
    var house_id = e.currentTarget.dataset.houseid
    wx.navigateTo({
      url: "../house-detail/index?house_id=" + house_id,
      success() {
        util.request(app.globalData.host + '/house/record', { house_id }, 'POST').then(res => {
          console.log('success');
        });
      }
    });
  },
  onLoad: function() {
    util.request(app.globalData.host + '/house/getRecord', {}, 'POST').then(res => {
      var list = res.data;
      console.log(res)
      this.setData({
        list
      })
    })
  }
})