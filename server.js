const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the root directory
app.use(express.static(__dirname + '/'));

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('convert', (data) => {
        const { number, fromBase, toBase } = data;
        try {
            const result = parseInt(number, fromBase).toString(toBase);
            socket.emit('conversionResult', { result });
        } catch (error) {
            socket.emit('conversionResult', { result: 'Invalid input' });
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server is running on http://127.0.0.1:8080');
});
