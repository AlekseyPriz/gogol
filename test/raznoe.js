// const https = require('https');
// const onlineBitcoinParser = require('./parsers/onlineBitcoinParser');
// const exchangers = require('./exchangers/exchangers');
// const asyncMap = require('async-map');

// let dataArr = [];
//
// function crauler(exchangers) {
//   asyncMap(exchangers,
//     (exchanger, cb) => {
//       function handler(response) {
//         let data = '';
//         response.on('data', function (chunk) {
//           data += chunk; });
//         response.on('end', function () {
//           // console.log('Data', data);
//           process(data, exchanger.name);
//         });
//       }
//       function process(data, name) {
//         onlineBitcoinParser(data, name, (result) => {
//           return cb(null, result);
//         });
//       }
//       const request = https.request(exchanger.url);
//       request.on('response', handler);
//       request.end();
//     },
//     (err, result) => {
//       if (err) throw err;
//       dataArr = result;
//       console.log(dataArr);
//     });
// }


//crauler(exchangers);
// var timerId = setInterval(function() {
//   crauler(exchangers);
// }, 10000);

/////

// app.get('/all', (req, res) => {
//   console.log(dataArr);
//   res.json(dataArr);
// });

