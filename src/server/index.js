const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const roles = require('./util');
const server = require('http').Server(app);


let players = [];
for (let i = 0; i < 12; i++) {
    players.push({
        name: null,
        whatsup: null,
        prepared: false
    })
}

app.use(express.static('dist'));
app.get('/api/getPlayers', (req, res) => res.send({ players, roles }));
// const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
const io = require('socket.io')(server);
io.on('connection', socket => {
    console.log('user connected');
    socket.on('sit', (id, name, whatsup) => {
        players[id] = {name, whatsup, prepared: true};
        io.emit('updatePlayers', players);
        if (players.every(player => player.prepared)) {


        }
    })
    socket.on('disconnect', () => {
        console.log('user disconected');
    })
})
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})