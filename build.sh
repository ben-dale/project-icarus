#!/bin/bash
# Compiles client code, copies into server/public
# Deploys to heroku

cd server
npm test

cd ../client
npm run --silent build
rm -rf server/public/*
cp -r dist/* ../server/public