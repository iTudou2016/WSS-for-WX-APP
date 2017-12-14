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


//web server
var webSvr = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('I am web server');
});

webSvr.listen(7007, function() {
    console.log('web server running at port 7007.')
});

//websocket server
var wsSvr = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('I am websocket server');
});

wsSvr.listen(7009, function() {
    console.log('websocket start listening at port 7009.')
});
