const http = require('http');
const express = require('express')
const app = express();
// const director = require('director');
const bot = require('./bot.js');

app.use((request, response, next) => {
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {
  request.chance = Math.random()
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World')
  bot.respond(req, res);

 })

app.listen(5000, () => {
  console.log('listening on 3000')
})

function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm Cool Guy.");
}