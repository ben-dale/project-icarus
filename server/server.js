var path = require('path');
var history = require('connect-history-api-fallback');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const staticFileMiddleware = express.static(path.join(__dirname, 'public'));
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  // verbose: true
}));
app.use(staticFileMiddleware);

io.on('connection', (socket) => {
  console.log('a user has connected: ' + socket.id)
  socket.on('avalon-start-new-game', (data) => {
    console.log(socket.id + ' has requested to start a new game');
    var gameId = "2894743";
    socket.emit('avalon-game-created', {id: gameId})
  });
  socket.on('disconnect', function() {
    console.log('a user has disconnected: ' + socket.id)
  });
});



http.listen(3000);