var path = require('path');
var history = require('connect-history-api-fallback');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var currentRooms = {};

const staticFileMiddleware = express.static(path.join(__dirname, 'public'));
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  // verbose: true
}));
app.use(staticFileMiddleware);

io.on('connection', (socket) => {
  console.log(socket.id + ' connected')
  socket.on('disconnect', function () {
    console.log(socket.id + ' disconnected');
  });

  socket.on('avalon-start-new-game', (data) => {
    var roomId = generateRoomId();
    joinRoom(socket, roomId);
    socket.emit('avalon-room-created', { id: roomId })
  });

  socket.on('join-room', (data) => {
    joinRoom(socket, data.roomId, data.name);
    io.in(data.roomId).emit('member-joined', { members: currentRooms[data.roomId].members });
  })
});

function joinRoom(socket, roomId, name) {
  socket.join(roomId)
  if (!currentRooms[roomId]) {
    console.log(roomId + ' created');
    currentRooms[roomId] = { open: true, members: {} }
  }
  if (name) {
    console.log(socket.id + ' = ' + name);
    currentRooms[roomId].members[socket.id] = { name: name };
  }
}

function generateRoomId() {
  return Math.random().toString(36).substring(7);
}

http.listen(3000);