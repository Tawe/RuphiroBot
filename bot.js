var HTTPS = require('https');
var botID = process.env.BOT_ID;
var campaignData;
var url = 'https://raw.githubusercontent.com/Tawe/RuphiroBot/master/data/data.json';
HTTPS.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        campaignData = body;
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});

function respond() {
  var request = JSON.parse(this.req.chunks[0])

  // if(request.text && request.text.startsWith("/ruphiro")) {
    this.res.writeHead(200);
    postMessage(request.text);
    this.res.end();
  // } else {
  //   console.log("don't care");
  //   this.res.writeHead(200);
  //   this.res.end();
  // }
}

function postMessage(copy) {
  var botResponse, options, body, botReq; 
  // var data = JSON.parse(campaignData);
  // botResponse = 'Each party member currently has ' + data.dragonsDemand.groupExp + ' Each! ';
  botResponse = copy;
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


function mock(mockData){
  if(mockData.text && mockData.text.startsWith("/ruphiro")) {
    var data = JSON.parse(campaignData);
    botResponse = 'Each party member currently has ' + data.dragonsDemand.groupExp + ' Each! ';
    return botResponse;
  } 
}

exports.respond = respond;
exports.mock = mock;