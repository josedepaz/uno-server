'use strict';

let uuid = 1;       // Use seq instead of proper unique identifiers for demo only

exports.home = function (request, reply) {

    reply('<html><head><title>Login page</title></head><body><h3>Welcome ' +
        '<script src="/socket.io/socket.io.js"></script>' +
        '<script>var socket = io();' +
        'socket.on("users", function(data){console.log(data);});' +
        '</script>' +
        request.auth.credentials.username +
        '!</h3><br/><form method="get" action="/logout">' +
        '<input type="submit" value="Logout">' +
        '</form></body></html>');
};

exports.login = function (request, reply) {

    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
    }

    let message = '';
    let account = null;

    if (request.method === 'get') {
        return reply('<html><head><title>Login page</title></head><body>' +
            (message ? '<h3>' + message + '</h3><br/>' : '') +
            '<form method="post" action="/login">' +
            'Username: <input type="text" name="username"><br>' +
            'Password: <input type="password" name="password"><br/>' +
            '<input type="submit" value="Login"></form></body></html>');
    }

    if (request.method === 'post') {

        if (!request.payload.username ||
            !request.payload.password) {

            message = 'Missing username or password';
        }
        else {
            this.db.db('unogyt').table('users').filter({ username: request.payload.username }).run().then(function (result) {
                if (result[0].password != request.payload.password) {
                    message = 'Invalid username or password';
                    return reply('<html><head><title>Login page</title></head><body>' +
                        (message ? '<h3>' + message + '</h3><br/>' : '') +
                        '<form method="post" action="/login">' +
                        'Username: <input type="text" name="username"><br>' +
                        'Password: <input type="password" name="password"><br/>' +
                        '<input type="submit" value="Login"></form></body></html>');
                } else {
                    account = result[0];
                    const sid = String(++uuid);
                    request.server.app.cache.set(sid, { account: account }, 0, (err) => {

                        if (err) {
                            reply(err);
                        }
                        request.cookieAuth.set({ sid: sid });
                        //request.server.app.cards[result[0].username] = [];
                        return reply.redirect('/');
                    });
                }
            }).catch(function (err) {
                message = 'Invalid username or password';
                return reply('<html><head><title>Login page</title></head><body>' +
                    (message ? '<h3>' + message + '</h3><br/>' : '') +
                    '<form method="post" action="/login">' +
                    'username: <input type="text" name="username"><br>' +
                    'Password: <input type="password" name="password"><br/>' +
                    '<input type="submit" value="Login"></form></body></html>');
            });;
        }
    }
};

exports.logout = function (request, reply) {

    request.cookieAuth.clear();
    return reply.redirect('/');
};
