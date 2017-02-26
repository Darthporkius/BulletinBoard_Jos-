var http = require('http');
// var module2 = require('./express_nodeOnly_tutorial/nodeOnly_module2');
var fs = require('fs');

function onRequest(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('./express_nodeOnly_tutorial/nodeOnly_index.html', null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write("File not found.");
        } else {
            response.write(data);
        }
        response.end();
    });
    // response.write(nodeOnly_module2.myString);
    // nodeOnly_module2.myFunction();
}

http.createServer(onRequest).listen(8000);