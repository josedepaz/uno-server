'use strict';

const Users = require('./handlers/users');

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
    }
]