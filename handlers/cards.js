'use strict';

const colors = ['r', 'g', 'b', 'y'];
let cards = [];
for (var i = 0; i < 10; i++) {
    colors.forEach(function (c, j) {
        cards.push({ number: i, color: c });
    });
}

function random(low, high) {
    return Math.round(Math.random() * (high - low) + low);
}

exports.getCard = function (request, reply) {
    generateCards(request);
    const c = cards[random(0,39)];
    request.server.app.cards[request.auth.credentials.username].push(c);

    request.server.app.io.emit("users", request.server.app.users);
    reply(c);
}

exports.getCards = function (request, reply) {
    generateCards(request);
    reply(request.server.app.cards[request.auth.credentials.username]);
}

function generateCards(request) {
    if (request.server.app.cards[request.auth.credentials.username] == undefined){
        request.server.app.cards[request.auth.credentials.username] = [];
        for (var i = 0; i < 7; i++) {
           request.server.app.cards[request.auth.credentials.username].push(cards[random(0,39)]);
        }
    }
}