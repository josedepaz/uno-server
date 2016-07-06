'use strict';

exports.list = function (request, reply) {
    this.db.db('unogyt').table('users').run().then(function(result){
        reply(result);
    });
};

exports.insert = function (request, reply) {
    const user = {
        id: request.payload.id,
        name: request.payload.name,
        lastname: request.payload.lastname,
        tel: request.payload.tel,
        email: request.payload.email,
        address: request.payload.address
    }
    this.db.db('unogyt').table('users').insert(user).run().then(function(){
        reply(user);
    });
};