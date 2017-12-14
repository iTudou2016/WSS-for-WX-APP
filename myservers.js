const http = require('http');
const https = require('https');
//const express = require('express');
const fs = require('fs');
const wsServer = require('ws').Server;
//const wtproxy = require('./webtelnet-proxy.js');

//const options = {
//  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
//};

const telnetconf {
    host: '127.0.0.1',
    port: 5555,	
};
const webconf {
    host: '127.0.0.1',
    port: 8080,	
};
const wsconf {
    host: '127.0.0.1',
    port: 6666,	
};

//web server
var webSvr = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.write('welcome to 91Mud, web content will show here later');
    res.end('I am web server');
});

webSvr.listen(webconf.port, function() {
    console.log('web server running at port ' + webconf.port)
});

//websocket server
var wsSvr = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('I am websocket server');
});

wsSvr.listen(wsconf.port, function() {
    console.log('websocket start listening at port '+ webconf.port)
});

var wss = new wsServer({
	server: wsSvr
});

wss.on('connection', function(wsConnect) {

    wsConnect.on('message', function(message) {
        console.log(message);
	console.log("hello again");
        wsConnect.send('reply: ' + message);
    });
});
