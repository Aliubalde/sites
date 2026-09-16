const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    const roomId = socket.handshake.query.roomId || 'global';
    socket.join(roomId);
    console.log('Um usuário conectou:', socket.id, 'na sala:', roomId);

    socket.on('play', (time) => {
        socket.to(roomId).emit('play', time);
    });

    socket.on('pause', (time) => {
        socket.to(roomId).emit('pause', time);
    });

    socket.on('seek', (time) => {
        socket.to(roomId).emit('seek', time);
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
