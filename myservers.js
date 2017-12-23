'use strict';

const https = require('https');
const fs = require('fs');
const wsServer = require('ws').Server;
const wtproxy = require('./webtelnet-proxy.js');

const options = {
  "key": fs.readFileSync('ssl.key'),
  "cert": fs.readFileSync('ssl.crt')
};

const telnetconf = {
    host: '127.0.0.1',
    port: 5555,	
};
const wsconf = {
    host: '127.0.0.1',
    port: 8080,	
};

//websocket server
var wsSvr = https.createServer(options, function(req, res) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('I am websocket server');
}).listen(wsconf.port, function() {
    console.log('websocket start listening at port '+ wsconf.port)
});

var wss = new wsServer({ server: wsSvr});

// create webtelnet proxy and bind to wss
var mudproxy = wtproxy(wss, telnetconf.port, telnetconf.host);
mudproxy.setCharset('gbk');
