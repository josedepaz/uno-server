'use strict';

const colors = ['red', 'green', 'blue', 'yellow'];
const specials = [{ number: '+4' }, { number: '+4' }];
let cards = [];
for (var i = 0; i < 10; i++) {
    colors.forEach(function (c, j) {
        cards.push({ number: i, color: c });
    });
}

/*colors.forEach(function (c, i) {
    cards.push({ number: "+2", color: c });
});
cards = cards.concat(specials);*/

function random(low, high) {
    return Math.round(Math.random() * (high - low) + low);
}

exports.getCard = function (request, reply) {
    generateCards(request);
    const c = cards[random(0,39)];
    request.server.app.users[request.auth.credentials.username].push(c);
    const cu = [];
    request.server.app.cards.forEach(function (v,k){
        console.log(k);
        cu.push(k);
    });
    request.server.app.io.emit("users", cu);
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