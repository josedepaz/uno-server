'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
var r = require('rethinkdbdash')({
    servers: [{ host: '192.168.56.101', port: 32772 }]
});

server.connection({ port: 4000 });
server.register([require('inert'), require('hapi-auth-cookie')], (err) => {
    if (err) {
        throw err;
    }
    server.bind({ db: r });


    const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('session', 'cookie', true, {
        password: 'password-should-be-32-characters',
        cookie: 'unouser',
        redirectTo: '/login',
        isSecure: false,
        validateFunc: function (request, session, callback) {

            cache.get(session.sid, (err, cached) => {

                if (err) {
                    return callback(err, false);
                }

                if (!cached) {
                    return callback(null, false);
                }

                return callback(null, true, cached.account);
            });
        }
    });

    server.route(require('./routes'));
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log("Server is running in", server.info.uri);
    });
});