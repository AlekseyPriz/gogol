const asyncMap = require('async-map');
const exchangers = require('../exchangers/exchangers');
const onlineBitcoinParser = require('../parsers/onlineBitcoinParser');
const https = require('https');


asyncMap(exchangers,
  (num, cb) => {
    function handler(response) {
      let data = '';
      response.on('data', function (chunk) {
        data += chunk; });
      response.on('end', function () {
        process(data);
      });
    }
    function process(data) {
      onlineBitcoinParser(data, (result) => {
        return cb(null, result);
      });
    }

    const request = https.request(num.url);
    request.on('response', handler);
    request.end();
  },
  (err, result) => {
  if (err) throw err;
  console.log(result)
});