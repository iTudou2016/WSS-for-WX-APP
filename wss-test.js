'use strict';
//定义https
//定义fs
//定义websocketserver
const https = require('https');
const fs = require('fs');
const WebSocketServer = require('ws').Server;
//定义安全证书
const options = {
  "key": fs.readFileSync("ssl.key"),
  "cert": fs.readFileSync("ssl.crt")
};
//创建https服务器对象
const httpsServer = https.createServer(options, function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
}).listen(8080, () => {
    console.log('[' + new Date() + '] Serveris listening on port 8080')
})
var wss = new WebSocketServer({
    server: httpsServer
});
wss.on('connection', function(wsConnect) {
    wssConnect.on('message', function(message) {
        console.log(message);
        if (message.type === 'utf8') {
            console.log('>> message content from client: ' + message.utf8Data)
            connection.sendUTF('[from server] ' + message.utf8Data)
        }
        wssConnect.send('reply');
    });
});
