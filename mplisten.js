var http=require('http');
var ports = [7006, 7007, 7008, 7009];
var servers = [];
var s;
function reqHandler(req, res) {
    console.log({
        remoteAddress: req.socket.remoteAddress,
        remotePort: req.socket.remotePort,
        localAddress: req.socket.localAddress,
        localPort: req.socket.localPort,
    });
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
}
ports.forEach(function(port) {
    s = http.createServer(reqHandler);
    s.listen(port);
    servers.push(s);
});