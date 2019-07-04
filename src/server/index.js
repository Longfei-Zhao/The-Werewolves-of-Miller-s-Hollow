const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;
const chalk = require('chalk');
const util = require('./util');
const gameStatus = require('./gameStatus');


const roles = util.shuffled_roles();
const emptyPlayers = util.initPlayers(12);
console.log(roles)
console.log(emptyPlayers)
let rooms = {}

app.use(express.static('dist'));
app.get('/api/init', (req, res) => res.send({ emptyPlayers }));
// const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

io.on('connection', socket => {
    let userId = socket.id;
    console.log('User ' + chalk.blue(userId) + ' connected');

    socket.on('joinRoom', (roomId, name, whatsup) => {
        socket.roomId = roomId;
        socket.name = name;
        socket.whatsup = whatsup;
        if (!(roomId in rooms)) {
            util.initRoom(rooms, roomId);
        }
        console.log(rooms);
        console.log('User ' + chalk.blue(userId) + ' name is ' + chalk.blue(socket.name));
        socket.join(roomId, () => {
            console.log('User ' + chalk.blue(socket.name) + ' Joins room ' + chalk.green(socket.roomId))
        });
        socket.emit('updateRoomInfo', rooms[roomId])
    })

    socket.on('sit', (playerId) => {
        console.log(chalk.blue(socket.name) + ' choose the position ' + chalk.green(playerId))
        let roomId = socket.roomId;
        rooms[roomId].players[playerId] = {
            name: socket.name,
            whatsup: socket.whatsup,
            prepared: true
        };
        io.to(roomId).emit('updatePlayers', rooms[roomId].players);
        // if (players.every(player => player.prepared)) {
        //     console.log('Game start...');
        //     io.emit('gameOn')
        // }
    })
    socket.on('disconnect', () => {
        console.log('User ' + chalk.blue(userId) + ' disconnected');
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})