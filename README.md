# Project Icarus

## Redis

Redis is used for both it's pub/sub capability and quick key/value storing capability.

The pub/sub capability is used by socket.io as an adapter. This is entirely managed by socket.io-redis. Web sockets are tied to the server that it has initiated the TCP handshake with, so naturally aren't scalable. socket.io-redis and Redis solves this problem for us by leveraging the pub/sub capability within Redis.

Redis is also used for it's key/value, to store metadata about currently running rooms, for example: who is in the room, their names, their score, their role in the game etc.

```shell
sudo apt install redis-server
```

By default Redis is only accessible from localhost, which is what we want.

Check if Redis is running

```shell
sudo systemctl status redis-server
```

Ping Redis

```shell
redis-cli -h localhost ping
```

## Development

```shell
cd client && npm run serve
```

Starts Vue.js hosting server on port 8080.

```shell
cd server && node server.js
```

Starts Express server on port 3000. This is where all the socket stuff is configured.

In development the client will point socket connections at localhost:3000.

Run server code unit tests

```shell
cd server && npm test
```

## Deployment

```shell
./build.sh
```

Compiles Vue.js app and moves to `./server/public`.

Commit these files to `master` at this point.

```shell
./deploy.sh
```

Pushes latest master to heroku.

## Selenium

[Selenium](https://selenium-python.readthedocs.io/locating-elements.html) is used to run automated tests in the browser, to make sure nothing is broken. Cypress would have been used but it doesn't support mulitple tabs and isn't really for this kind of testing.

```shell
sudo apt install geckodriver-firefox
pip3 install selenium
```

Run geckodriver

```shell
geckodriver
```

Once geckodriver is running locally, you can run any of the tests in `/simulations`.

```shell
python3 test.py
```
