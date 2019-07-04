const gameStatus = require('./gameStatus');
const roles = [0, 0, 0, 0, 1, 1, 1, 1, 2, 3, 4, 5];

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function shuffled_roles() {
    return shuffle(roles);
}

function initPlayers(n) {
    let emptyPlayers = [];
    for (let i = 0; i < n; i++) {
        emptyPlayers.push({
            name: null,
            whatsup: null,
            prepared: false
        })
    }
    return emptyPlayers
}

function initRoom(rooms, roomId) {

    let emptyPlayers = initPlayers(12);

    rooms[roomId] = {
        players: emptyPlayers,
        roles: shuffled_roles(),
        status: gameStatus.PREPARING
    }
}

module.exports = {
    shuffled_roles,
    initRoom,
    initPlayers
};