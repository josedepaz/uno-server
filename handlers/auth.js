'use strict';

let uuid = 1;       // Use seq instead of proper unique identifiers for demo only

exports.home = function (request, reply) {

    reply('<html><head><title>Login page</title></head><body><h3>Welcome ' +
        request.auth.credentials.name +
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
            'Email: <input type="text" name="email"><br>' +
            'Password: <input type="password" name="password"><br/>' +
            '<input type="submit" value="Login"></form></body></html>');
    }

    if (request.method === 'post') {

        if (!request.payload.email ||
            !request.payload.password) {

            message = 'Missing email or password';
        }
        else {
            this.db.db('unogyt').table('users').filter({ email: request.payload.email }).run().then(function (result) {
                if (result[0].password != request.payload.password) {
                    message = 'Invalid email or password';
                    return reply('<html><head><title>Login page</title></head><body>' +
                        (message ? '<h3>' + message + '</h3><br/>' : '') +
                        '<form method="post" action="/login">' +
                        'Email: <input type="text" name="email"><br>' +
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
                        return reply.redirect('/');
                    });
                }
            }).catch(function (err) {
                message = 'Invalid email or password';
                return reply('<html><head><title>Login page</title></head><body>' +
                    (message ? '<h3>' + message + '</h3><br/>' : '') +
                    '<form method="post" action="/login">' +
                    'Email: <input type="text" name="email"><br>' +
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
