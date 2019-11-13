var g = "872", f = "635", s = "271", h = "829", c = "0x7", p = "0x380", v = "0x1e000000", x = "0xf000", d = "0x700000", m = "0x70000", I = "1111111111111111111111", b = "11111111111110000110", S = "0010000000110001111000";
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function py_nunpc(r) {
  var t = i(r.toString(), g + f + s + h), u = o(e(t, c), 7), l = n(e(t, p), 7), w = n(e(t, v), 13), y = o(e(t, x), 13), A = n(e(t, d), 4), D = o(e(t, m), 4), M = a(a(a(a(a(a(e(t, I + b + S), u), l), w), y), A), D);
  return parseInt(M, 2);
}
function n(r, t) {
  var n = r;
  return 64 != r.length && (n = parseInt(r).toString(2)), n = n.length > 0 ? n.substr(0, n.length - t) : "",
    u(n);
}

function e(r, t) {
  var n = r, e = t;
  64 != n.length && (n = u(parseInt(n).toString(2))), 64 != e.length && (e = u(parseInt(t).toString(2)));
  for (var a = "", i = 0; i < n.length; i++) a += parseInt(n[i]) & parseInt(e[i]);
  return a;
}

function a(r, t) {
  var n = r, e = t;
  64 != n.length && (n = u(parseInt(n).toString(2))), 64 != e.length && (e = u(parseInt(t).toString(2)));
  for (var a = "", i = 0; i < n.length; i++) a += parseInt(n[i]) | parseInt(e[i]);
  return a;
}

function i(r, t) {
  var n = r, e = t;
  64 != n.length && (n = u(parseInt(n).toString(2))), 64 != e.length && (e = u(parseInt(t).toString(2)));
  for (var a = "", i = 0; i < n.length; i++) a += parseInt(n[i]) ^ parseInt(e[i]);
  return a;
}

function u(r) {
  if (r.length > 64) return r = r.substr(r.length - 64, r.length);
  for (var t = 64 - r.length, n = "", e = 0; e < t; e++) n += "0";
  return n += r;
}

function o(r, t) {
  var n = r;
  64 != r.length && (n = parseInt(r).toString(2));
  for (var e = 0; e < t; e++) n += "0";
  return u(n);
}

function l(r) {
  return r < 10 ? "" + r : 10 == r ? "a" : 11 == r ? "b" : 12 == r ? "c" : 13 == r ? "d" : 14 == r ? "e" : "f";
}
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        "token": wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.statusCode == 401){
          urlLose();
        }else{
          if (res.statusCode == 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  });
}

module.exports = {
  formatTime,
  parseTime,
  login,
  request
}
