const asyncMap = require('async-map');
const exchangers = require('./exchangers/exchangers');
const https = require('https');
const parseString = require('xml2js').parseString;
const _ = require('lodash');


module.exports = function (cdCrauler) {
    return asyncMap(exchangers,
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
        console.log('Результат выполнения Краулера =>');//, _.flattenDeep(resultAsyncMap));
        cdCrauler(null, _.flattenDeep(resultAsyncMap));

        //res.json( _.flattenDeep(resultAsyncMap) );
      });

  };



