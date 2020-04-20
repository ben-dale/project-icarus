var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user has connected')
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000);