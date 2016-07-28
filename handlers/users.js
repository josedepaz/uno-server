'use strict';

exports.list = function (request, reply) {
    this.db.db('unogyt').table('users').run().then(function(result){
        reply(result);
    });
};

exports.insert = function (request, reply) {
    const user = {
        username: request.payload.username,
        password: request.payload.password
    }
    this.db.db('unogyt').table('users').insert(user).run().then(function(){
        reply(user);
    });
};