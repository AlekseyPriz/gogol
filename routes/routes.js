// Переписать используя принцым DRY
const https = require('https');
const path = require('path');
const onlineBitcoinParser = require('../parsers/onlineBitcoinParser');
const exchangers = require('../exchangers/exchangers');
const asyncMap = require('async-map');
const _ = require('lodash');
////
const parseString = require('xml2js').parseString;
const fs = require('fs');
////

module.exports = {

  bigArr: (req, res) => {
    asyncMap(exchangers,
      (exchanger, cbAsyncMap) => {

        function handler(response) {
          let data = '';
          response.on('data', function (chunk) {
            data += chunk; });
          response.on('end', function () {
            process(data, exchanger);
          });
        }

        function process(data, exchanger) {
          return parseString(data, function (err, resultArr) {

            if(!resultArr) {
              console.log(exchanger.name, 'Нет данных');
              cbAsyncMap(null, {message: "Нет данных"});
            } else {

              cbAsyncMap(null, exArrRefactoring(resultArr.rates.item, exchanger));

              function createExPare(item, exchanger) {
                for (key in item) { item[key] = item[key][0] }
                item.ex = exchanger.name;
                item.startPage = exchanger.startPage;

                return item;
              }

              function exArrRefactoring (exArr, exchanger) {
                return _.map(exArr, (eachItem) => { return createExPare(eachItem, exchanger); });
              }



              // cbAsyncMap(null, _.map(resultArr.rates.item, para => {
              //     para.ex = exchanger.name;
              //     para.startPage = exchanger.startPage;
              //     return para;
              //   })
              // );
            }
          })
        }

        const request = https.request(exchanger.url);
        request.on('response', handler);
        request.end();
      },
      (err, resultAsyncMap) => {
        if (err) throw err;
        console.log('Результат выполнения concat =>');
        res.json( _.reject(_.flattenDeep(resultAsyncMap) , {message: "Нет данных"}));


      });

  }

  // start: (req, res) => {
  //   asyncMap(exchangers,
  //     (exchanger, cbAsyncMap) => {
  //       function handler(response) {
  //         let data = '';
  //         response.on('data', function (chunk) {
  //           data += chunk; });
  //         response.on('end', function () {
  //           process(data, exchanger.name);
  //         });
  //       }
  //       function process(data, name) {
  //         onlineBitcoinParser(data, name, 'BTC', 'CARDRUB', (err, result) => {
  //           return cbAsyncMap(null, result);
  //         });
  //       }
  //       const request = https.request(exchanger.url);
  //       request.on('response', handler);
  //       request.end();
  //     },
  //     (err, resultAsyncMap) => {
  //       if (err) throw err;
  //       console.log('Результат выполнения asyncMap Старт =>',_.filter(resultAsyncMap, 'to'));
  //       res.json(_.filter(resultAsyncMap, 'to'));
  //     });
  // },
  // single: (req, res) => {
  //   function handler(response) {
  //     let data = '';
  //     response.on('data', function (chunk) {
  //       data += chunk; });
  //     response.on('end', function () {
  //       process(data, exchangers[0].name);
  //     });
  //   }
  //   function process(data, name) {
  //     onlineBitcoinParser(data, name, (result) => {
  //       res.json(result);
  //     });
  //   }
  //
  //   const request = https.request(exchangers[0].url);
  //   request.on('response', handler);
  //   request.end();
  //
  // },
  // group: (req, res) => {
  //   asyncMap(exchangers,
  //     (exchanger, cbAsyncMap) => {
  //       function handler(response) {
  //         let data = '';
  //         response.on('data', function (chunk) {
  //           data += chunk; });
  //         response.on('end', function () {
  //           process(data, exchanger.name);
  //         });
  //       }
  //       function process(data, name) {
  //         onlineBitcoinParser(data, name, req.params.from, req.params.to, (err, result) => {
  //           return cbAsyncMap(null, result);
  //         });
  //       }
  //       const request = https.request(exchanger.url);
  //       request.on('response', handler);
  //       request.end();
  //     },
  //     (err, resultAsyncMap) => {
  //       if (err) throw err;
  //       console.log('Результат выполнения asyncMap =>', _.filter(resultAsyncMap, 'to'));
  //
  //       res.json(_.filter(resultAsyncMap, 'to'));
  //
  //     });
  // },



};