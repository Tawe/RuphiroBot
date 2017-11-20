var HTTPS = require('https');
var botID = process.env.BOT_ID;
var campaignData;
var strArr = [];
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
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/ruphiro\s/;

  if(request.text && botRegex.test(request.text)) {
    strArr =request.text.split(' ');
    this.res.writeHead(200);
    postMessage(strArr[1]);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(copy) {
  var botResponse, options, body, botReq;
  // var data = JSON.parse(campaignData)  
  if(copy == 'exp'){
    botResponse = handleExp()
  } else if(copy == 'location'){
    botResponse = handleLocation();
  }
  // botResponse = 'Sigh '+ data.dragonsDemand.groupExp +' '+copy;

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

function handleExp(){
  var data = JSON.parse(campaignData);
  var currentExp = data.dragonsDemand.groupExp;
  var levelExp = data.dragonsDemand.expPath.medium;
  var currentLevel = 0;
  var maxExp = 0;

  for(var i = 0; i<levelExp.length; i++){
    if(levelExp[i] > currentExp){
        currentLevel = i;
        maxExp = levelExp[i];
        break;
    }
  }

  var expDiff = maxExp - currentExp;

  return "The party is currently level "+ currentLevel+", and each party memeber has "+currentExp +"xp. Which puts them "+expDiff+"xp away from their next level!";
}

function handleLocation(){
  var data = JSON.parse(campaignData);
  var location = data.dragonsDemand.location;
  return 'The party is currently located in ' + location;
}
exports.respond = respond;