const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('dist'));
app.get('/', (req, res) => res.send().status(200));


const server = app.listen(port, () => console.log(`Listening on port ${port}!`));
const io = require('socket.io')(server);
io.on('connection', socket => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconected');
    })
})