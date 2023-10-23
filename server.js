const https = require('https');
const app = require('./index');
const fs = require('fs');
const port = 8000

const options = {
    key: fs.readFileSync('Keys/server.key'),
    cert: fs.readFileSync('Keys/server.crt')
};
const httpserver = https.createServer((req,res) => {
    const httpsUrl = 'https://${req.headers.host}:${req.url}' 
    res.writeHead(200, {Location: httpsUrl})
    res.end();
});

httpserver.listen(8080,()=>{
    console.log('listening on port ' + port);
});

const server = https.createServer(options, app);

server.listen(port, () => {
    console.log('HTTPS server listening on port', port);
});

module.exports = server;