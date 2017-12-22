// pages/wsclient/wsclient.js
// http://blog.csdn.net/xiaochun365/article/details/75039742
var ansi_up = require('ansi_up.js');

Page({
  
  data: {
    outString: "This is page data.",
    nodes: [],
    inputValue: "",
    inputFocus: true,    
    scrolltop: 10

  },

  ab2str: function (buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  },

binayUtf8ToString: function (buf, begin) {
    var i = 0;
    var pos = 0;
    var str = "";
    var unicode = 0;
    var flag = 0;
    for (pos = begin; pos < buf.length;) {
      flag = buf[pos];
      if ((flag >>> 7) === 0) {
        str += String.fromCharCode(buf[pos]);
        pos += 1;

      }
      else if ((flag & 0xFC) === 0xFC) {
        unicode = (buf[pos] & 0x3) << 30;
        unicode |= (buf[pos + 1] & 0x3F) << 24;
        unicode |= (buf[pos + 2] & 0x3F) << 18;
        unicode |= (buf[pos + 3] & 0x3F) << 12;
        unicode |= (buf[pos + 4] & 0x3F) << 6;
        unicode |= (buf[pos + 5] & 0x3F);
        str += String.fromCharCode(unicode);
        pos += 6;

      } else if ((flag & 0xF8) === 0xF8) {
        unicode = (buf[pos] & 0x7) << 24;
        unicode |= (buf[pos + 1] & 0x3F) << 18;
        unicode |= (buf[pos + 2] & 0x3F) << 12;
        unicode |= (buf[pos + 3] & 0x3F) << 6;
        unicode |= (buf[pos + 4] & 0x3F);
        str += String.fromCharCode(unicode);
        pos += 5;

      }
      else if ((flag & 0xF0) === 0xF0) {
        unicode = (buf[pos] & 0xF) << 18;
        unicode |= (buf[pos + 1] & 0x3F) << 12;
        unicode |= (buf[pos + 2] & 0x3F) << 6;
        unicode |= (buf[pos + 3] & 0x3F);
        str += String.fromCharCode(unicode);
        pos += 4;

      }

      else if ((flag & 0xE0) === 0xE0) {
        unicode = (buf[pos] & 0x1F) << 12;;
        unicode |= (buf[pos + 1] & 0x3F) << 6;
        unicode |= (buf[pos + 2] & 0x3F);
        str += String.fromCharCode(unicode);
        pos += 3;

      }
      else if ((flag & 0xC0) === 0xC0) { //110
        unicode = (buf[pos] & 0x3F) << 6;
        unicode |= (buf[pos + 1] & 0x3F);
        str += String.fromCharCode(unicode);
        pos += 2;

      }
      else {
        str += String.fromCharCode(buf[pos]);
        pos += 1;
      }
    }
    return str;
  },

writeToScreen: function (str) {
  
    this.setData({
      outString: this.data.outString + str
    });
  },

writeServerData: function (buf) {
    var data = new Uint8Array(buf);
    var str = this.binayUtf8ToString(data, 0);

    var lines = str.split('\r\n');
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].replace(/\s\s/g, '&nbsp;');
      if (i < lines.length - 1) line += '<br/>';

      // replace the prompt "> " with a empty line
      var len = line.length;
      if (len >= 2 && line.substr(len - 2) == '> ') line = line.substr(0, line - 2) + '<br/>';

      //line = ansi_up.ansi_to_html(line);
      nodes = this.data.nodes.children.push(ansi_up.ansi_to_html(line));
      //此处返回array，具有children格式；然后append到nodes数组中children下。
      this.setData({
        //outString: this.data.outString + str
        nodes: nodes;
      });
      
      //this.writeToScreen(line);
    }
  },

  onLoad: function (options) {
    // Do some initialize when page load.
  },
  onReady: function () {
    // Do something when page ready.
    // websocket creation.
    var that = this;

    wx.connectSocket({
      url: 'ws://localhost:8080'
    });
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！'+ res.data)
    });
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    });
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data);
/*      that.setData({
        outString: that.data.outString + " " + res.data + "\r\n"
      })
*/
      that.writeServerData(res.data);
    });
  },

  onShow: function () {
    // Do something when page show.
  },
  onHide: function () {
    // Do something when page hide.
  },
  onUnload: function () {
    // Do something when page close.
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  },
  onPageScroll: function () {
    // Do something when page scroll
  },
  // Event handler.

  bindKeyInput: function (e) {
    wx.sendSocketMessage({
      data: e.detail.value + "\n",
    });
    this.setData({
      inputValue: "",
      inputFocus: true,      
    })
  },

  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    }, function () {
      // this is setData callback
    })
  },



})
