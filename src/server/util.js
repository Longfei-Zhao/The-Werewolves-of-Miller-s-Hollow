const GAMESTATUS = require('./gameStatus');
const PLAYERSTATUS = {
    ALIVE: 'alive',
    DEAD: 'dead'
}
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
    // ROLE.WEREWOLF,
    // ROLE.WEREWOLF,
    // ROLE.WEREWOLF,
    ROLE.VILLAGER,
    // ROLE.VILLAGER,
    // ROLE.VILLAGER,
    // ROLE.VILLAGER,
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
        prepared: false,
        status: null
    }
}

function initPlayers(n) {
    let emptyPlayers = [];
    for (let i = 0; i < n; i++) {
        emptyPlayers.push({
            name: null,
            whatsup: null,
            prepared: false,
            status: null
        })
    }
    return emptyPlayers
}

function initRoom(rooms, roomId) {

    let emptyPlayers = initPlayers(6);
    rooms[roomId] = {
        players: emptyPlayers,
        roles: shuffled_roles(),
        status: GAMESTATUS.PREPARING
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
        prepared: true,
        status: PLAYERSTATUS.ALIVE
    };
}

function checkGameStart(roomId) {
    return rooms[roomId].players.every(player => player.prepared)
}

function killPlayer(roomId, playerId) {
    rooms[roomId].players[playerId].status = PLAYERSTATUS.DEAD
}

function savePlayer(roomId, playerId) {
    rooms[roomId].players[playerId].status = PLAYERSTATUS.ALIVE
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
    killPlayer,
    savePlayer,
    getRoom,
    getPlayers,
    checkGameStart
};