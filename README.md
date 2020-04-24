# Project Icarus

## Redis

Redis is used for both it's pub/sub capability and quick key/value storing capability.

The pub/sub capability is used by socket.io as an adapter. This is entirely managed by socket.io-redis. Web sockets are tied to the server that it has initiated the TCP handshake with, so naturally aren't scalable. socket.io-redis and Redis solves this problem for us by leveraging the pub/sub capability within Redis.

Redis is also used for it's key/value, to store metadata about currently running rooms, for example: who is in the room, their names, their score, their role in the game etc.

```
sudo apt install redis-server
```
By default Redis is only accessible from localhost, which is what we want.

Check if Redis is running
```
sudo systemctl status redis-server
```

Ping Redis
```
redis-cli -h localhost ping
```