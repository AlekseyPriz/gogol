const https = require('https');
const xmlParser = require('./xmlParser');
const xmlParserFilter = require('./xmlParserFilter');
const xmlParserBitcoin = require('./xmlParserBitcoin');


// const url = 'https://fastchange.cc/valuta.xml';
const url = 'https://kassa.cc/valuta.xml';

//https://www.xnxx.com/video-7f8j109/voracious_02_stoya_chastity_lynn_roxy_raye_jessie_volt_lea_lexis_rain_degr

function process(data) {
  //xmlParser(data);
  // xmlParserFilter(data);
  xmlParserBitcoin(data);
}

function handler(response) {
  let data = '';
  response.on('data', function (chunk) {
    data += chunk; });
  response.on('end', function () {
    process(data);
  });
}

const request = https.request(url);
request.on('response', handler);
request.end();