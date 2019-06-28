const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const roles = require('./util');

console.log(roles)
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
const server = app.listen(port, () => console.log(`Listening on port ${port}!`));
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