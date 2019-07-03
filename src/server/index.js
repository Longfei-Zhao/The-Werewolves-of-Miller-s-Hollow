const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;
const chalk = require('chalk');
const roles = require('./util');
const gameStatus = require('./gameStatus');
 

let players = [];
for (let i = 0; i < 12; i++) {
    players.push({
        name: null,
        whatsup: null,
        prepared: false
    })
}
let rooms = []

app.use(express.static('dist'));
app.get('/api/init', (req, res) => res.send({ players, roles }));
// const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

io.on('connection', socket => {
    let userId = socket.id;
    console.log('User ' + chalk.blue(userId) + ' connected');

    socket.on('joinRoom', (roomId, name, whatsup) => {
        socket.roomId = roomId;
        socket.name = name;
        socket.whatsup = whatsup;
        console.log('User ' + chalk.blue(userId) + ' name is ' + chalk.blue(socket.name));
        socket.join(roomId, () => {
            console.log('User ' + chalk.blue(socket.name) + ' Join room ' + chalk.green(roomId))
        });  
    })

    socket.on('sit', (playerId) => {
        console.log(chalk.blue(socket.name) + ' choose the position ' + chalk.green(playerId))
        players[playerId] = {
            name: socket.name, 
            whatsup: socket.whatsup, 
            prepared: true
        };
        io.to(socket.roomId).emit('updatePlayers', players);
        if (players.every(player => player.prepared)) {
            console.log('Game start...');
            io.emit('gameOn', )
        }
    })
    socket.on('disconnect', () => {
        console.log('User ' + chalk.blue(userId) + ' disconnected');
    })
})
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})