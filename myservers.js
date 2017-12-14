//web server
var server = http.createServer(function(req, res) {});

server.listen(8888, function() {
    console.log('server running')
});

//websocket server
var server_for_socket = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('i am websocket server');
});

server_for_socket.listen(9999, function() {
    console.log('websocket start listening at port 9999')
});
