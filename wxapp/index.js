//index.js
Page({
  data: {
    outString: "This is page data.",
    inputCmd: "Input command.",
    
  },
  onLoad: function(options) {
    // Do some initialize when page load.
  },
  onReady: function() {
    // Do something when page ready.
  // websocket creation.
  wx.connectSocket({
    url: 'test.php'
  })
  wx.onSocketOpen(function(res){
    console.log('WebSocket连接已打开！')
  })
  wx.onSocketError(function(res){
    console.log('WebSocket连接打开失败，请检查！')
  })
  var sock = io.connect();
  sock.on('stream', function(buf){
    writeServerData(buf);
  });
  sock.on('status', function(str){
    writeToScreen(str);
  });
  sock.on('connected', function(){
    console.log('connected');
  });
  sock.on('disconnect', function(){
    console.log('disconnected');
  });  
    
  },
  onShow: function() {
    // Do something when page show.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
   // return custom share data when user share.
  },
  onPageScroll: function() {
    // Do something when page scroll
  },
  // Event handler.
  
  bindKeyInput: function(e) {
    this.setData({
      inputCmd: e.detail.value
    })
  },
  
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
    })
  },
  
  customData: {
    hi: 'MINA'
  }
})
