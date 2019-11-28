var app = getApp();
var util = require('../../utils/util.js');
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    imgUrls: [
      '../../images/house.png',
      '../../images/house.png',
      '../../images/house.png'
    ],
    configure: {
      '宽带': '../../images/icon/wifi.png',
      '床': '../../images/icon/bed.png',
      '衣柜': '../../images/icon/wardrobe.png',
      '沙发': '../../images/icon/sofa.png',
      '桌椅': '../../images/icon/desk.png',
      '电视': '../../images/icon/tv.png',
      '空调': '../../images/icon/air-conditioning.png',
      '洗衣机': '../../images/icon/washing.png',
      '冰箱': '../../images/icon/fridge.png',
      '热水器': '../../images/icon/heater.png',
      '燃气灶': '../../images/icon/gas.png',
      '抽烟机': '../../images/icon/smoke.png',
      '独卫': '../../images/icon/toilet.png',
      '阳台': '../../images/icon/balcony.png',
    },
    houseInfo: null,
    condition: [],
    configures: [],
    requires: []
  },
  callLandlord: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  onLikeHouse() {
    var openid = wx.getStorageSync('openid');
    if (openid) {
      util.request(app.globalData.host + '/house/like', {
        house_id: this.data.houseInfo.house_id,
        openid
      }, 'POST').then(res => {
        if (res.code == 200) {
          var houseInfo = this.data.houseInfo;
          houseInfo.like = Math.abs(houseInfo.like - 1)
          this.setData({
            houseInfo
          })
        } else {
          Toast.fail('收藏失败');
        }
      })
    } else {
      Toast.fail('请先登录');
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
  onLoad: function(options) {
    var house_id = +options.house_id;
    util.request(app.globalData.host + '/house/get', {
      house_id,
      islogin: this.islogin()
    }, 'POST').then(res => {
      console.log(res)
      var houseInfo = res.data;
      var condition = [];
      var configures = [];
      var requires = houseInfo.require.split(',');
      var bright = houseInfo.bright.split(',');
      condition.push(houseInfo.decorate)
      if (bright + '') {
        condition.push(...bright)
      }
      if (houseInfo.elevator == 1) {
        condition.push('有电梯');
      }
      if (houseInfo.parking == 1) {
        condition.push('有车位');
      }
      var configure = houseInfo.config.split(',');
      configures.push(...configure);
      houseInfo.settle_time = houseInfo.settle_time.slice(0, 10).split('-').join('.');
      this.setData({
        houseInfo,
        condition,
        configures,
        requires
      })
    })
  }
})