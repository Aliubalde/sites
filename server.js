const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Um usuário conectou:', socket.id);

    socket.on('play', (time) => {
        socket.broadcast.emit('play', time);
    });

    socket.on('pause', (time) => {
        socket.broadcast.emit('pause', time);
    });

    socket.on('seek', (time) => {
        socket.broadcast.emit('seek', time);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectou:', socket.id);
    });
});

// Porta padrão 3000 ou a porta definida pela hospedagem
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
