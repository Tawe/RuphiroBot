const HTTPS = require('https');
const fetch = require('node-fetch');
const botID = process.env.BOT_ID;
// let data = {};
// fetch('https://raw.githubusercontent.com/Tawe/RuphiroBot/master/data/data.json')
//   .then(res => res.text())
//   .then(body => {
//     data = JSON.parse(body);
//   });

function respond() {
  var request = JSON.parse(this.req.chunks[0])
  var regex = /^\/ruphiro exp$/;

  if(request.text && regex.test(request.text.)) {
    // let command = request.text.split(' ')
    postMessage();
  } else {
    console.log("don't care");
  }
  this.res.writeHead(200);
  this.res.end();
}

function postMessage() {
  let botResponse, options, body, botReq;

  // if(type=='greeting'){
    // botResponse = 'Yes Sir!';
  // } else if(type === 'exp'){
    // botResponse = handleExp();
    botResponse= 'huh?'
  // 
  // } else if(type === 'location'){
    // botResponse === 'The Group is in Bitterbridge';
  // }

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

// function handleExp(){
//   let groupExp = data.dragonsDemand.groupExp;
  
//   return "The Personal Exp of the group is currently " + groupExp;
// }

exports.respond = respond;
