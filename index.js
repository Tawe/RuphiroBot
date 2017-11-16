const http = require('http');
const express = require('express')
const app = express();
const director = require('director');
const bot = require('./bot.js');

const router = new director.http.Router({
  '/' : {
    post: bot.respond,
    get: ping
  }
});

app.get('/', (req, res) => {
  res.send('Hello World')
  req.chunks = [];
      req.on('data', function (chunk) {
      req.chunks.push(chunk.toString());
  });
  bot.respond(req, res);
  // router.dispatch(req, res, function(err) {
  //   res.writeHead(err.status, {"Content-Type": "text/plain"});
  //   res.end(err.message);
  // });
})

app.listen(5000, () => {
  console.log('listening on 3000')
})

// const requestHandler = (req, res) => {
//   console.log(req.url)
//   res.end('Hello Node.js Server!')
//   req.chunks = [];
//   req.on('data', function (chunk) {
//     req.chunks.push(chunk.toString());
//   });


// }

// const server = http.createServer(requestHandler)

// const port = 5000;
// server.listen(port, (err) => {
//   if (err) {
//     return console.log('something bad happened', err)
//   }

//   console.log(`server is listening on ${port}`)
// })


function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm Cool Guy.");
}