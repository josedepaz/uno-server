'use strict';

const Users = require('./handlers/users');
const Cards = require('./handlers/cards');
const Auth = require('./handlers/auth');

module.exports = [
    { method: 'GET', path: '/users', handler: Users.list },
    { method: 'POST', path: '/users', handler: Users.insert },
    { method: 'GET', path: '/cards/r', handler: Cards.getCard },
    { method: 'GET', path: '/cards/0/', handler: Cards.getCards},
    { method: 'GET', path: '/', config: { handler: Auth.home } },
    { method: ['GET', 'POST'], path: '/login', config: { handler: Auth.login, auth: { mode: 'try' }, plugins: { 'hapi-auth-cookie': { redirectTo: false } } } },
    { method: 'GET', path: '/logout', config: { handler: Auth.logout } }
]