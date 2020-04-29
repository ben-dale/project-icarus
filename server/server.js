// Custom code
const room = require('./room.js');
const redis = require('./redis.js');
const player = require('./player.js');
const avalon = require('./avalon.js');

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

  socket.on('avalon-start-new-game', () => {
    let roomId = room.generateId();
    let playerId = socket.id;
    socket.join(roomId);
    player.init(redis, playerId, roomId);
    room.init(redis, socket, roomId, playerId);
    socket.emit('avalon-room-created', { id: roomId })
  });

  socket.on('player-join', (data) => {
    if (data) {
      player.join(redis, socket, io, data.roomId, data.name);
    }
  });

  socket.on('player-ready', (data) => {
    const roomId = Object.keys(socket.rooms)[1];
    const currentScreen = data.screen;
    player.markAsReady(redis, socket.id, (updatedPlayer) => {
      io.in(roomId).emit('player-updated', updatedPlayer);
      room.allPlayersAreReady(redis, roomId, () => {
        if (currentScreen === "lobby") {
          avalon.initGame(redis, io, roomId);
        } else if (currentScreen === "roleReveal") {
          avalon.startGame(redis, io, roomId);
        }
      });
    });
  });

  socket.on('propose-team', (data) => {
    const roomId = Object.keys(socket.rooms)[1];
    console.log(data);
    avalon.proposeQuestMembers(redis, io, socket.id, roomId, data.memberIds);
  });

  socket.on('player-not-ready', () => {
    const roomId = Object.keys(socket.rooms)[1];
    player.markAsNotReady(redis, socket.id, (updatedPlayer) => {
      io.in(roomId).emit('player-updated', updatedPlayer);
    });
  })

  socket.on('update-settings', (data) => {
    if (data && data.roomId && data.settings) {
      let playerId = socket.id;
      let roomId = data.roomId;
      room.updateSettings(redis, playerId, roomId, data.settings, (updatedRoom) => {
        io.in(roomId).emit('room-updated', updatedRoom);
      });
    }
  });
});

// Run the damn thing!
http.listen(process.env.PORT || 3000);