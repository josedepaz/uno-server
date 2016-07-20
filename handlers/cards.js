'use strict';

const colors = ['red', 'green', 'blue', 'yellow'];
const specials = [{ number: '+4' }, { number: '+4' }];
let cards = [];
for (var i = 0; i < 10; i++) {
    colors.forEach(function (c, j) {
        cards.push({ number: i, color: c });
    });
}

colors.forEach(function (c, i) {
    cards.push({ number: "+2", color: c });
});
cards = cards.concat(specials);

function random(low, high) {
    return Math.random() * (high - low) + low;
}

exports.getCard = function (request, reply) {
    reply(cards[Math.round(random(0,45))]);
}