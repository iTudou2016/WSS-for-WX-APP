'use strict';

const http = require('http');
const https = require('https');
//const express = require('express');
const fs = require('fs');
const wsServer = require('ws').Server;
const WebSocket = require('ws');
const wtproxy = require('./webtelnet-proxy.js');

const options = {
  "key": fs.readFileSync('ssl.key'),
  "cert": fs.readFileSync('ssl.crt')
};

const telnetconf = {
    host: '127.0.0.1',
    port: 5555,	
};
const webconf = {
    host: '127.0.0.1',
    port: 8080,	
};
const wsconf = {
    host: '0.0.0.0',
    port: 7777,	
};
/*
//https server
var httpsSvr = https.createServer(options, function(req, res) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.write('welcome to 91Mud, web content will show here later\n');
    res.end('I am web server\n');
});

httpsSvr.listen(webconf.port, function() {
    console.log('web server running at port ' + webconf.port)
});

//websocket server
var wsSvr = https.createServer(options, function(req, res) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('I am websocket server');
});

wsSvr.listen(wsconf.port, function() {
    console.log('websocket start listening at port '+ wsconf.port)
});

var wss = new wsServer({
    server: wsSvr
});
*/
var wss = new WebSocket.Server({port: 8080});
/*
wss.on('connection', function(wsConnect) {

    wsConnect.on('message', function(message) {
        console.log(message);
        wsConnect.send('reply: ' + message);
     });
});
*/
// create webtelnet proxy and bind to wss
var mudproxy = wtproxy(wss, telnetconf.port, telnetconf.host);
mudproxy.setCharset('gbk');
// create webtelnet proxy and bind to wss
//var mudproxy = wtproxy(wss, telnetconf.port, telnetconf.host);
//mudproxy.setCharset('gbk');
