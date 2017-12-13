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
    res.setHead(200, {'Content-Type', 'text/plain'});
  res.end('Hello World\n');
}).listen(8080, () => {
    console.log('[' + new Date() + '] Serveris listening on port 8080')
})

var wsss = new WebSocketServer({
    server: httpsServer
});
wsss.on('connection', function(wssConnect) {
    wssConnect.on('message', function(message) {
        console.log(message);
        if (message.type === 'utf8') {
            console.log('>> message content from client: ' + message.utf8Data)
            connection.sendUTF('[from server] ' + message.utf8Data)
        }
        wssConnect.send('reply');
    });
});
