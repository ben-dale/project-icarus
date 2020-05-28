const AvalonSocket = require('./avalon/AvalonSocket');
const ResistanceSocket = require('./resistance/ResistanceSocket');

// Setup express app
const express = require('express');
const app = express();
const http = require('http').createServer(app);

// Setup redis socket adapter for socket.io (so we can run on multiple instances)
const redisSocketAdapter = require('socket.io-redis');
const io = require('socket.io')(http);
var REDIS_URL = process.env.REDIS_URL;
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

// Connect to redis
redisClient.on('connect', () => { console.log('Redis client connected') });

// Manage socket connections
io.on('connection', (socket) => {
  console.log(socket.id + ' connected');
  socket.on('connect-avalon', () => {
    console.log('player connected to avalon game...');
    new AvalonSocket().registerListeners(io, socket, redisClient);
  });
  socket.on('connect-resistance', () => {
    console.log('player connected to resistance game...');
    new ResistanceSocket().registerListeners(io, socket, redisClient);
  });
});

process.on('uncaughtException', (err, origin) => {
  console.log(
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`
  );
});

http.listen(process.env.PORT || 3000);