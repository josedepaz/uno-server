'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
var r = require('rethinkdbdash')({
    servers: [{ host: '192.168.56.101', port: 32772 }]
});

server.connection({ port: 8080 });
server.register([require('inert')], (err) => {
    if (err) {
        throw err;
    }
    server.bind({ db: r });
    server.route(require('./routes'));
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log("Server is running in", server.info.uri);
    });
});