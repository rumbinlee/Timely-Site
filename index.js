var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/selfsigned.key', 'utf8');
var certificate = fs.readFileSync('sslcert/selfsigned.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
const ex = require('express');
const app = ex();
const port = 80;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use('/view', ex.static('public'))

app.get('/', (req,res) => {
  res.redirect('/view/index.html');
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);
