const https = require('https');
const xmlParserBitcoinGroup = require('./parsers/xmlParserBitcoinGroup');
const exchangers = require('./exchangers/exchangers');

function process(data, name) {
  xmlParserBitcoinGroup(data, name);
}

exchangers.forEach((exchanger) => {
  let request = https.request(exchanger.url);
  request.on('response', (response) => {
    let data = '';
    response.on('data', function (chunk) {
      data += chunk; });
    response.on('end', function () {
      process(data, exchanger.name);
    });
  });
  request.end();
});

