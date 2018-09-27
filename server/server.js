const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
let users = 0;
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

io.on('connection', (socket) => {
  users = users + 1;
  console.log('New user connected, total no. of connected users:', users);

  socket.on('disconnect', () => {
    users = users - 1;
    console.log('Client disconnected, total no. of connected users:', users);
  });

  socket.on('createMessage', (newMsg) => {
    io.emit('newMessage', newMsg)
  });

  io.emit('newConnection', {users});
});

server.listen(port, () => {
  console.log(`Server is up running on port ${port}`);
});
