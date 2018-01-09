const https = require('https');
const onlineBitcoinParser = require('../parsers/onlineBitcoinParser');
const exchangers = require('../exchangers/exchangers');
const asyncMap = require('async-map');
const _ = require('lodash');
const parseString = require('xml2js').parseString;

data = [];

function crauler(exchangers) {
  asyncMap(exchangers,
    (exchanger, cbAsyncMap) => {
      function handler(response) {
        let data = '';
        response.on('data', function (chunk) {
          data += chunk; });
        response.on('end', function () {
          process(data, exchanger.name);
        });
      }
      function process(data, name) {
        return parseString(data, function (err, resultArr) {
          cbAsyncMap(null, _.map(resultArr.rates.item, para => {
              para.ex = name;
              return para;
            })
          );
        })
      }
      const request = https.request(exchanger.url);
      request.on('response', handler);
      request.end();
    },
    (err, resultAsyncMap) => {
      if (err) throw err;
      console.log('Результат выполнения concat =>', resultAsyncMap);
      //res.json( _.flattenDeep(resultAsyncMap) );
    });


  // asyncMap(exchangers,
  //   (exchanger, cb) => {
  //     function handler(response) {
  //       let data = '';
  //       response.on('data', function (chunk) {
  //         data += chunk; });
  //       response.on('end', function () {
  //         process(data, exchanger.name);
  //       });
  //     }
  //
  //     function process(data, name) {
  //       onlineBitcoinParser(data, name, (result) => {
  //         return cb(null, result);
  //       });
  //     }
  //     const request = https.request(exchanger.url);
  //     request.on('response', handler);
  //     request.end();
  //   },
  //   (err, result) => {
  //     if (err) throw err;
  //     data = result;
  //     console.log(data);
  //   });
}



var timerId = setInterval(function() {
  crauler(exchangers);
}, 5000);
