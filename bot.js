const HTTPS = require('https');
const botID = process.env.BOT_ID;
const data = ffetch('./data/data.json').then(function(response) {
  return response.blob();
})
function respond() {
  let request = JSON.parse(this.req.chunks[0])
  const regex = /\/ruphiro/g;

  if(request.text && regex.test(request.text.toLowerCase())) {
    let command = request.text.split(' ')
    postMessage(command[1]);
  } else {
    console.log("don't care");
  }
  this.res.writeHead(200);
  this.res.end();
}

function postMessage(type) {
  let botResponse, options, body, botReq;

  if(type=='greeting'){
    botResponse = 'Yes Sir!';
  } else if(type === 'exp'){
    botResponse = data.Dragons_demand.gropExp;
  
  } else if(type === 'location'){
    botResponse === 'The Group is in Bitterbridge';
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