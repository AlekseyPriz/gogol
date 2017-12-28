// let currencies = ['one', 'two', 'three'];
//
// if (currencies.indexOf('two') == 1 ) {
//   console.log('элемент находиться в массиве');
// } else {
//   console.log('элемента нет в массиве');
//
// }

// var each = require('async-each-series');
//
// each(['foo','bar','baz'], function(el, next) {
//   setTimeout(function () {
//     console.log(el);
//     next();
//   }, Math.random() * 5000);
// }, function (err) {
//   console.log('finished');
// });

const http = require('http');
const xmlParser = require('./xmlParser');
const xmlParserFilter = require('./xmlParserFilter');
const xmlParserBitcoin = require('./xmlParserBitcoin');


// const url = 'https://fastchange.cc/valuta.xml';
//const url = 'https://kassa.cc/valuta.xml';
const url = 'http://superobmenka.com/ru/export/xml';


function process(data) {
  console.log(data);
  //xmlParser(data);
  // xmlParserFilter(data);
  //xmlParserBitcoin(data);
}

function handler(response) {

  let data = '';
  response.on('data', function (chunk) {
    data += chunk; });
  response.on('end', function () {
    process(data);
  });
}

const request = http.request({
  hostname: '193.178.251.78',
  path: '/ru/export/txt_xr',
  method: 'GET'
});
request.on('response', handler);
request.end();

//степана супруна дом 3 дом 5