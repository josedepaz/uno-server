'use strict';

const Users = require('./handlers/users');
const Cards = require('./handlers/cards');

module.exports = [
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: Users.list
    },
    {
        method: 'POST',
        path: '/users',
        handler: Users.insert
    },
    {
        method: 'GET',
        path: '/cards/up',
        handler: Cards.getCard
    }
]