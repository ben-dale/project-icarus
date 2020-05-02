const Room = require('./Room.js');
const Player = require('./Player.js');
const AllPlayers = require('./AllPlayers.js');
const { v4: uuidv4 } = require('uuid');

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

// Configure Redis
const redis = require('redis');
var REDIS_URL = process.env.REDIS_URL
var redisClient = REDIS_URL ? redis.createClient(REDIS_URL) : redis.createClient(); // defaults a connection to localhost:6379

redisClient.on('connect', () => { console.log('Redis client connected') });

// Socket listening configuration
io.on('connection', (socket) => {
  console.log(socket.id + ' connected')
  socket.on('disconnect', function () {
    // player.leave(redis, socket, io);
    // what to do if player leaves half way through game? can we generate a code for them to come back in?
    console.log(socket.id + ' disconnected');
  });

  socket.on('init-avalon', () => {
    let roomId = uuidv4().split("-")[0];

    let room = new Room().init(roomId);
    room.storeInRedis(redisClient);

    socket.emit('avalon-created', roomId);
  });

  socket.on('player-joined', (data) => {
    if (data && data.name && data.name.length > 0 && data.roomId) {
      new Room().getFromRedis(redisClient, data.roomId, (room) => {
        const playerId = socket.id;

        let player = new Player().init(playerId, data.name, data.roomId);
        player.storeInRedis(redisClient);

        const updatedRoom = room.addPlayerId(socket.id);
        updatedRoom.storeInRedis(redisClient);

        socket.join(data.roomId);

        new AllPlayers().getFromRedis(redisClient, updatedRoom.playerIds, (allPlayers) => {
          console.log(allPlayers);

          updatedRoom.emitToAll(io);
          allPlayers.emitToAll(io, data.roomId);
        }, () => { });
      });
    }
  });

  socket.on('player-updated', (data) => {
    if (data) {
      new Player().getFromRedis(redisClient, socket.id, (player) => {
        let updatedPlayer = player.copy();
        if (data.hasOwnProperty('ready')) {
          updatedPlayer = updatedPlayer.withReady(data.ready);
        }
        updatedPlayer.storeInRedis(redisClient);
        updatedPlayer.emitToAll(io);
      }, () => { });
    }
  });

  socket.on('room-updated', (data) => {
    if (data) {
      new Player().getFromRedis(redisClient, socket.id, (player) => {
        new Room().getFromRedis(redisClient, player.roomId, (room) => {
          if (player.id == room.ownerId) {
            let updatedRoom = room.copy();
            if (data.game && data.game.settings && data.game.settings.hasOwnProperty('percivalEnabled')) {
              updatedRoom.game.settings = updatedRoom.game.settings.withPercivalEnabled(data.game.settings.percivalEnabled);
            }
            if (data.game && data.game.settings && data.game.settings.hasOwnProperty('oberonEnabled')) {
              updatedRoom.game.settings = updatedRoom.game.settings.withOberonEnabled(data.game.settings.oberonEnabled);
            }
            if (data.game && data.game.settings && data.game.settings.hasOwnProperty('morganaEnabled')) {
              updatedRoom.game.settings = updatedRoom.game.settings.withMorganaEnabled(data.game.settings.morganaEnabled);
            }
            updatedRoom.storeInRedis(redisClient);
            updatedRoom.emitToAll(io);
          }
        }, () => { });
      }, () => { });
    }
    console.log(data);
  });

  // socket.on('player-ready', (data) => {
  //   const roomId = Object.keys(socket.rooms)[1];
  //   const currentScreen = data.screen;
  //   player.markAsReady(redis, socket.id, (updatedPlayer) => {
  //     io.in(roomId).emit('player-updated', updatedPlayer);
  //     room.allPlayersAreReady(redis, roomId, () => {
  //       if (currentScreen === "lobby") {
  //         avalon.initGame(redis, io, roomId);
  //       } else if (currentScreen === "roleReveal") {
  //         avalon.startGame(redis, io, roomId);
  //       }
  //     });
  //   });
  // });

  // socket.on('propose-team', (data) => {
  //   const roomId = Object.keys(socket.rooms)[1];
  //   console.log(data);
  //   avalon.proposeQuestMembers(redis, io, socket.id, roomId, data.memberIds);
  // });

  // socket.on('player-not-ready', () => {
  //   const roomId = Object.keys(socket.rooms)[1];
  //   player.markAsNotReady(redis, socket.id, (updatedPlayer) => {
  //     io.in(roomId).emit('player-updated', updatedPlayer);
  //   });
  // })

  // socket.on('update-settings', (data) => {
  //   if (data && data.roomId && data.settings) {
  //     let playerId = socket.id;
  //     let roomId = data.roomId;
  //     room.updateSettings(redis, playerId, roomId, data.settings, (updatedRoom) => {
  //       io.in(roomId).emit('room-updated', updatedRoom);
  //     });
  //   }
  // });
});

// Run the damn thing!
http.listen(process.env.PORT || 3000);