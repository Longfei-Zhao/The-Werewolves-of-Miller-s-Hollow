const gameStatus = require('./gameStatus');
const ROLE = {
    WEREWOLF: 'werewolf',
    VILLAGER: 'villager',
    SEER: 'seer',
    WITCH: 'witch',
    HUNTER: 'hunter',
    IDIOT: 'idiot'
}
const roles = [
    ROLE.WEREWOLF,
    ROLE.WEREWOLF,
    ROLE.WEREWOLF, 
    ROLE.WEREWOLF, 
    ROLE.VILLAGER, 
    ROLE.VILLAGER, 
    ROLE.VILLAGER, 
    ROLE.VILLAGER, 
    ROLE.SEER, 
    ROLE.WITCH, 
    ROLE.HUNTER, 
    ROLE.IDIOT
];

let rooms = {}

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

function removePlayer(roomId, playerId) {
    rooms[roomId].players[playerId] = {
        name: null,
        whatsup: null,
        prepared: false
    }
}

function initPlayers(n) {
    let emptyPlayers = [];
    emptyPlayers.push({
        name: null,
        whatsup: null,
        prepared: false
    })
    for (let i = 1; i < n; i++) {
        emptyPlayers.push({
            name: '123',
            whatsup: '123',
            prepared: true
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

function joinRoom(roomId) {
    if (!(roomId in rooms)) {
        initRoom(rooms, roomId);
    }
}

function sit(roomId, playerId, name, whatsup) {
    rooms[roomId].players[playerId] = {
        name: name,
        whatsup: whatsup,
        prepared: true
    };
}

function checkGameStart(roomId) {
    return rooms[roomId].players.every(player => player.prepared)
}

function getRoom(roomId) {
    return rooms[roomId]
}

function getPlayers(roomId) {
    return rooms[roomId].players
}

module.exports = {
    shuffled_roles,
    initRoom,
    initPlayers,
    removePlayer,
    joinRoom,
    sit,
    getRoom,
    getPlayers,
    checkGameStart
};