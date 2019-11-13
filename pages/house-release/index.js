var app = getApp();
var util = require('../../utils/util.js');
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rentType: 0,
    estateName: '',
    houseArea: '',
    houseTypes: [],
    directions: ['东', '西', '南', '北', '东南', '东北', '西南', '西北', '南北', '东西'],
    floors: [],
    parkings: ['无车位', '有车位'],
    elevators: ['无电梯', '有电梯'],
    houseTimes: ['随时看房', '仅周末', '仅工作日'],
    peopleNums: ['1人', '2人', '3人', '4人', '5人', '6人', '7人', '8人', '9人', '10人'],
    houseTime: '请选择',
    peopleNum: '请选择',
    settleTime: '请选择',
    show: false,
    houseType: '请选择',
    direction: '请填写',
    floor: '请选择',
    parking: '请选择',
    elevator: '请选择',
    rent: '',
    rentTypeIndex: 1,
    rentTypes: ['押一付一', '押一付三', '半年付', '年付'],
    cost: [{
      item: '水费',
      isSelected: false
    }, {
      item: '电费',
      isSelected: false
    },
    {
      item: '燃气费',
      isSelected: false
    },
    {
      item: '宽带费',
      isSelected: false
    },
    {
      item: '物业费',
      isSelected: false
    },
    {
      item: '取暖费',
      isSelected: false
    },
    {
      item: '有线电视费',
      isSelected: false
    }
    ],
    name: '',
    phone: '',
    bindType: 'cost',
    result: ['a', 'b'],
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    decorate: ['毛坯', '简单装修', '精装修', '豪华装修'],
    decorateIndex: -1,
    houseConfigs: [{
      config: '宽带',
      isSelected: false
    }, {
      config: '床',
      isSelected: false
    }, {
      config: '衣柜',
      isSelected: false
    }, {
      config: '沙发',
      isSelected: false
    }, {
      config: '桌椅',
      isSelected: false
    }, {
      config: '电视',
      isSelected: false
    }, {
      config: '空调',
      isSelected: false
    }, {
      config: '洗衣机',
      isSelected: false
    }, {
      config: '冰箱',
      isSelected: false
    }, {
      config: '热水器',
      isSelected: false
    }, {
      config: '燃气灶',
      isSelected: false
    }, {
      config: '抽烟机',
      isSelected: false
    }, {
      config: '独卫',
      isSelected: false
    }, {
      config: '阳台',
      isSelected: false
    }],
    houseBright: [{
      bright: '南北通透',
      isSelected: false
    }, {
      bright: '首次出租',
      isSelected: false
    }],
    houseRequire: [{
      req: '只限女生',
      isSelected: false
    }, {
      req: '一家人',
      isSelected: false
    }, {
      req: '禁止养宠物',
      isSelected: false
    }, {
      req: '半年起租',
      isSelected: false
    }, {
      req: '一年起租',
      isSelected: false
    }, {
      req: '租户稳定',
      isSelected: false
    }, {
      req: '作息正常',
      isSelected: false
    }, {
      req: '禁烟',
      isSelected: false
    }],
    dialogShow: false,
    textareaValue: ''
  },
  selectType(e) {
    var isLogin = wx.getStorageSync('openid');
    if (isLogin) {
      this.setData({
        rentType: e.currentTarget.dataset.type
      })
    } else {
      Toast.fail('请先登录');
    }
  },
  handleSelect(e) {
    console.log(e.currentTarget.dataset.type)
    this.setData({
      show: true,
      bindType: e.currentTarget.dataset.type
    })
  },
  hideSelect() {
    this.setData({
      show: false
    })
  },
  chooseImage() {
    wx.chooseImage({
      count: 9,
      success: function (res) {
        console.log(res)
      }
    })
  },
  onConfirm(e) {
    if (this.data.bindType == 'houseType') {
      var values = e.detail.values;
      var houseType = '';
      for (var p of values) {
        houseType += p.name;
      }
      this.setData({
        houseType
      })
    } else if (this.data.bindType == 'direction') {
      this.setData({
        direction: e.detail.value
      })
    } else if (this.data.bindType == 'floor') {
      this.setData({
        floor: e.detail.value
      })
    } else if (this.data.bindType == 'parking') {
      this.setData({
        parking: e.detail.value
      })
    } else if (this.data.bindType == 'elevator') {
      this.setData({
        elevator: e.detail.value
      })
    } else if (this.data.bindType == 'cost') {
      this.setData({
        cost: e.detail.value
      })
    } else if (this.data.bindType == 'houseTime') {
      this.setData({
        houseTime: e.detail.value
      })
    } else if (this.data.bindType == 'peopleNum') {
      this.setData({
        peopleNum: e.detail.value
      })
    } else if (this.data.bindType == 'settleTime') {
      this.setData({
        settleTime: util.parseTime(e.detail)
      });
      console.log(this.data.settleTime)
    }
    this.setData({
      show: false
    })
  },
  onSelectDecorate(e) {
    var index = e.currentTarget.dataset.index;
    if (index == this.data.decorateIndex) {
      index = -1
    }
    this.setData({
      decorateIndex: index
    })
  },
  onSelectRentTypes(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      rentTypeIndex: index
    })
  },
  onSelectRent(e) {
    var cost = this.data.cost;
    cost[e.currentTarget.dataset.index].isSelected = !cost[e.currentTarget.dataset.index].isSelected;
    this.setData({
      cost
    })
  },
  onSelectConfig(e) {
    var houseConfigs = this.data.houseConfigs;
    houseConfigs[e.currentTarget.dataset.index].isSelected = !houseConfigs[e.currentTarget.dataset.index].isSelected;
    this.setData({
      houseConfigs
    })
  },
  onSelectBright(e) {
    var houseBright = this.data.houseBright;
    houseBright[e.currentTarget.dataset.index].isSelected = !houseBright[e.currentTarget.dataset.index].isSelected;
    this.setData({
      houseBright
    })
  },
  onSelectRequire(e) {
    var houseRequire = this.data.houseRequire;
    houseRequire[e.currentTarget.dataset.index].isSelected = !houseRequire[e.currentTarget.dataset.index].isSelected;
    this.setData({
      houseRequire
    })
  },
  onConfirmPublish() {
    this.setData({
      dialogShow: true
    })
  },
  onPublish() {
    var config = [];
    for (let i = 0; i < this.data.houseConfigs.length; i++) {
      if (this.data.houseConfigs[i].isSelected) {
        config.push(this.data.houseConfigs[i].config)
      }
    }
    var bright = [];
    for (let i = 0; i < this.data.houseBright.length; i++) {
      if (this.data.houseBright[i].isSelected) {
        bright.push(this.data.houseBright[i].bright)
      }
    }
    var require = [];
    for (let i = 0; i < this.data.houseRequire.length; i++) {
      if (this.data.houseRequire[i].isSelected) {
        require.push(this.data.houseRequire[i].req)
      }
    }
    var cost = [];
    for (let i = 0; i < this.data.cost.length; i++) {
      if (this.data.cost[i].isSelected) {
        cost.push(this.data.cost[i].item)
      }
    }

    var postData = {
      house_type: this.data.rentType == '1' ? '整租' : '合租',
      area_name: this.data.estateName,
      area: this.data.houseArea,
      type: this.data.houseType,
      direction: this.data.direction,
      floor: this.data.floor,
      parking: this.data.parking == '无车位' ? 0 : 1,
      elevator: this.data.elevator == '无电梯' ? 0 : 1,
      rent: this.data.rent,
      rent_type: this.data.rentTypes[this.data.rentTypeIndex],
      cost: String(cost),
      landlord: this.data.name,
      phone: this.data.phone,
      look_time: this.data.houseTime,
      people: this.data.peopleNum,
      settle_time: this.data.settleTime,
      openid: wx.getStorageSync('openid'),
      decorate: this.data.decorate[this.data.decorateIndex],
      config: String(config),
      bright: String(bright),
      require: String(require),
      introduce: this.data.textareaValue
    };
    Toast.loading({
      mask: true,
      message: '正在发布',
      duration: 0
    });
    var flag = true;
    if (postData.area_name == '' || postData.area_name ) {
      flag = false;
    }
    if (postData.area == '' || postData.area <= 0) {
      flag = false;
    }
    if (postData.rent == '' || postData.area <= 0) {
      flag = false;
    }
    if (postData.area_name == '') {
      flag = false;
    }

    if (flag) {
      util.request(app.globalData.host + '/house/publish', postData, 'POST').then(res => {
        Toast.clear();
        if (res.code == 200) {
          wx.navigateBack({})
        } else {
          Toast.fail('发布失败，请确认信息无误');
        }
      })
    } else {
      Toast.fail('请确认信息无误，且不能有空项！');
    }
    
  },
  onClose() {
    this.setData({
      dialogShow: false
    })
  },
  bindBlur(e) {
    console.log(e)
    var type = e.currentTarget.dataset.type;
    if (type == 'areaName') {
      this.setData({
        estateName: e.detail.value
      })
    } else if (type == 'area') {
      this.setData({
        houseArea: e.detail.value
      })
    } else if (type == 'name') {
      this.setData({
        name: e.detail.value
      })
    } else if (type == 'phone') {
      this.setData({
        phone: e.detail.value
      })
    } else if (type == 'rent') {
      this.setData({
        rent: e.detail.value
      })
    } else if (type == 'textarea') {
      this.setData({
        textareaValue: e.detail.value
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var floors = [];
    for (let i = 1; i < 100; i++) {
      floors.push(i + '层');
    }
    var houseTypes = {
      province_list: {},
      city_list: {},
      county_list: {}
    };
    for (let i = 0; i < 10; i++) {
      houseTypes.province_list['1' + i + '110' + i] = i + '室';
      houseTypes.city_list['1' + i + '1' + i + '0' + i] = i + '厅';
      houseTypes.county_list['11110' + i] = i + '卫';
    }
    this.setData({
      houseTypes,
      floors
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})