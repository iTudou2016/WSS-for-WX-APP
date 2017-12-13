'use strict';
//定义http
//定义fs
//定义websocketserver
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws').Server;

//创建http服务器对象
const httpServer = http.createServer((req, res) =>  {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(8080, () => {
    console.log('[' + new Date() + '] Serveris listening on port 8080')
})

var wss = new WebSocket({
	server: httpServer
});

wss.on('connection', function(wsConnect) {

    wsConnect.on('message', function(message) {
        console.log(message);
	console.log("hello again");
        wsConnect.send('reply: ' + message);
    });
});
