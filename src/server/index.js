const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;
const chalk = require('chalk');
const util = require('./util');
const GAMESTATUS = require('./gameStatus');

app.use(express.static('dist'));
app.get('/api/init', (req, res) => res.send({ players: util.initPlayers(12) }));
// const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
io.on('connection', socket => {
    let userId = socket.id;
    socket.playerId = null;
    console.log('User ' + chalk.blue(userId) + ' connected');

    socket.on('joinRoom', (roomId, name, whatsup) => {
        socket.roomId = roomId;
        socket.name = name;
        socket.whatsup = whatsup;
        util.joinRoom(roomId);
        console.log('User ' + chalk.blue(userId) + ' name is ' + chalk.blue(name));
        socket.join(roomId, () => {
            console.log('User ' + chalk.blue(name) + ' Joins room ' + chalk.green(roomId))
        });
        socket.emit('updateRoomInfo', util.getRoom(roomId))
        // socket.emit('updatePlayers', util.getPlayers(roomId));
    })

    socket.on('sit', (playerId) => {
        socket.playerId = playerId;
        console.log(chalk.blue(socket.name) + ' choose the position ' + chalk.green(playerId))
        let roomId = socket.roomId;
        util.sit(roomId, playerId, socket.name, socket.whatsup);
        io.to(roomId).emit('updatePlayers', util.getPlayers(roomId));
        if ( util.checkGameStart(roomId)) {
            console.log('Game start...');
            io.emit('updateGameStatus', GAMESTATUS.START);
        }
    })

    // socket.on('prepared', () => {
    //     console.log(chalk.blue(socket.name) + ' is prepared.');
    //     let roomId = socket.roomId;
    //     let playerId = socket.playerId;
    //     rooms[roomId].players[playerId].prepared = true;
    //     // if (players.every(player => player.prepared)) {
    //     //     console.log('Game start...');
    //     //     io.emit('gameOn')
    //     // }
    // })

    socket.on('disconnect', () => {
        console.log('User ' + chalk.blue(userId) + ' disconnected');
        if (socket.playerId !== null) {
            let roomId = socket.roomId
            util.removePlayer(roomId, socket.playerId);
            io.to(roomId).emit('updatePlayers', util.getPlayers((roomId)));
        }
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})