// Custom code
const room = require('./room.js');
const redis = require('./redis.js');
const player = require('./player.js');

// Environment variables configured by Heroku
const REDIS_URL = process.env.REDIS_URL;

// Setup express app
const express = require('express');
const app = express();
const http = require('http').createServer(app);

// Setup redis socket adapter for socket.io (so we can run on multiple instances)
const redisSocketAdapter = require('socket.io-redis');
const io = require('socket.io')(http);
io.adapter(REDIS_URL ? redisSocketAdapter(REDIS_URL) : redisSocketAdapter({ host: REDIS_URL, port: 6379 }));

// Setup history and hosting of vue app
const history = require('connect-history-api-fallback');
const path = require('path');
const staticFileMiddleware = express.static(path.join(__dirname, 'public'));
app.use(staticFileMiddleware);
app.use(history({ disableDotRule: true }));
app.use(staticFileMiddleware);

// Socket listening configuration
io.on('connection', (socket) => {
  console.log(socket.id + ' connected')
  socket.on('disconnect', function () {
    player.leave(redis, socket, io);
    console.log(socket.id + ' disconnected');
  });

  socket.on('avalon-start-new-game', (data) => {
    let roomId = room.generateId();
    room.init(redis, socket, roomId);
    socket.emit('avalon-room-created', { id: roomId })
  });

  socket.on('player-join', (data) => {
    if (data) {
      player.join(redis, socket, io, data.roomId, data.name);
    }
  });

  socket.on('player-ready', (data) => {
    player.ready(redis, socket, io, data.screen);
  });

  socket.on('player-not-ready', () => {
    player.notReady(redis, socket, io);
  })

  socket.on('update-settings', (data) => {
    if (data) {
      room.updateSettings(redis, socket, io, data.roomId, data.settings);
    }
  });
});

// Run the damn thing!
http.listen(process.env.PORT || 3000);