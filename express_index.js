var http = require('http');
var module2 = require('./express_tutorial/module2');

function onRequest(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(module2.myString);
    module2.myFunction();
    response.end();
}

http.createServer(onRequest).listen(8000);