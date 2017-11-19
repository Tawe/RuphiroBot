var HTTPS = require('https');
var fetch = require('node-fetch');
var get = require('simple-get')
var botID = process.env.BOT_ID;
var jsonData = {};

get('https://raw.githubusercontent.com/Tawe/RuphiroBot/master/data/data.json', function (err, res, data) {
  if (err) throw err
  console.log(res.statusCode) // 200
  console.log(jsonData) // Buffer('this is the server response')
})

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/ruphiro exp$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = 'Huh? ' + jsonData;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;