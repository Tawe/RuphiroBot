var HTTPS = require('https');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0])
  var greetingRegex = /^\/ruphiro$/;
  var expRegex = /^\/ruphiro exp$/;

  if(request.text && greetingRegex.test(request.text.toLowerCase())) {
    postMessage('greeting');
  } else if(request.text && expRegex.test(request.text.toLowerCase())) {
    postMessage('exp')
  } else {
    console.log("don't care");
  }
  this.res.writeHead(200);
  this.res.end();
}

function postMessage(type) {
  var botResponse, options, body, botReq;

  if(type=='greeting'){
    botResponse = 'Yes Sir!';
  } else if(type === 'exp'){
    botResponse = 'Fetching that Sir!'
  }

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