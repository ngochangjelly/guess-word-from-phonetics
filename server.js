// Including all required packages for server app
const restify = require('restify');
const server = restify.createServer();
const routes = require('./routes');
const port = 3000;

// We use redis in order to validate that secret JSON web token has been stored.
// If we find it, we will ensure that JWT validation is made for every API call.

server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.queryParser());

// The server will be listening on Port 3000
server.listen(port, (errors) => {
    if (errors) {
        console.error(errors);
    }
});

// This will define the available routes that the server will handle
routes(server);

module.exports = server;
