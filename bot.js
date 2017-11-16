var HTTPS = require('https');
var botID = process.env.BOT_ID;

function respond(req, res) {
  var request = JSON.parse(req.chunks[0]),
      botRegex = /^\/ruphiro$/;

  if(request.text && botRegex.test(request.text)) {
    res.writeHead(200);
    postMessage();
    res.end();
  } else {
    console.log("don't care");
    res.writeHead(200);
    res.end();
  }
}

function postMessage() {
  var botResponse = 'Yes Sir!'
  var options, body, botReq;


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