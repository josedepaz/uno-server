'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 4000 });
const io = require('socket.io')(server.listener);
const r = require('rethinkdbdash')({
    servers: [{ host: '192.168.56.101', port: 32772 }]
    //servers: [{ host: '107.170.97.13', port: 32769 }]
});

server.register([require('inert'), require('hapi-auth-cookie')], (err) => {
    if (err) {
        throw err;
    }
    server.bind({ db: r });


    const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;
    server.app.cards = [];
    server.app.users = [];

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

    io.on('connection', function (socket) {
        console.log("User connected");

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        io.emit('users', server.app.cards);
    });

    server.app.io = io;

    server.route(require('./routes'));
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log("Server is running in", server.info.uri);
    });

});