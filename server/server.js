const path = require('path');
const history = require('connect-history-api-fallback');
const express = require('express');
const app = express();
const http = require('http').createServer(app);

const redisSocketAdapter = require('socket.io-redis');
const io = require('socket.io')(http);
io.adapter(redisSocketAdapter({ host: 'localhost', port: 6379 }))

const redis = require('redis')
var redisClient = redis.createClient(); // defaults a connection to localhost:6379

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
    let roomId = generateRoomId();
    joinRoom(socket, roomId);
    socket.emit('avalon-room-created', { id: roomId })
  });

  socket.on('join-room', (data) => {
    joinRoom(socket, data.roomId, data.name);
  });
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

function putObjectInRedis(key, value) {
  redisClient.set(key, JSON.stringify(value));
  redisClient.expire(key, 86400);
}

function getObjectFromRedis(key, onSuccess, onError) {
  console.log('getting thing from redis, ' + key)
  redisClient.get(key, (error, result) => {
    console.log('error = ' + error);
    console.log('result = ' + result);
    if (error) {
      onError();
    }
    onSuccess(JSON.parse(result));
  });
}

function joinRoom(socket, roomId, name) {
  socket.join(roomId);
  getObjectFromRedis(roomId, (room) => {
    if (room && name) {
        console.log(socket.id + ' = ' + name);
        room.members[socket.id] = { name: name };
        putObjectInRedis(roomId, room);
        io.in(roomId).emit('member-joined', { members: room.members });
    } else {
      console.log(roomId + ' created');
      if (name) {
        putObjectInRedis(roomId, { open: true, members: {} })
      } else {
        putObjectInRedis(roomId, { open: true, members: { [socket.id]: { name: name } } })
      }
    }
  }, () => { });
}


function generateRoomId() {
  return Math.random().toString(36).substring(10);
}

http.listen(3000);