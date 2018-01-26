// Переписать используя принцым DRY
const https = require('https');
const path = require('path');
const _ = require('lodash');
////
const parseString = require('xml2js').parseString;
const fs = require('fs');
////
const exchenger = {
  // name: 'kassa',
  // startPage: 'https://kassa.cc',
  // url: 'https://kassa.cc/valuta.xml'

  // name: 'idram.armchange',
  // startPage: 'https://idram.armchange.ru',
  // url: 'https://idram.armchange.ru/exportxml.xml'

  // name: 'bankcomat',
  // startPage: 'https://bankcomat.com',
  //  url: 'https://bankcomat.com/valuta.xml'

  // name: 'newline',
  // startPage: 'https://newline.online',
  // url: 'https://newline.online/exportxml.xml'

  // name: 'buy-bitcoins',
  // startPage: 'https://www.buy-bitcoins.pro',
  // url: 'https://www.buy-bitcoins.pro/request-exportxml.xml'

  name: 'cryptochange',
  startPage: 'https://cryptochange.net',
  url: 'https://cryptochange.net/curs.xml'


};
//
function handler(response) {
  let data = '';
  response.on('data', function (chunk) {
    data += chunk;
  });
  response.on('end', function () {
    process(data, exchenger);
  });
}

function process(data, exchanger) {
  //console.log('data =>', data);
  parseString(data, function (err, resultArr) {
    if(!resultArr) {
      console.log('Нет данных')
    } else {
      console.log(exArrRefactoring(resultArr.rates.item, exchanger));
    }
  })
}

function createExPare(item, exchanger) {
  for (key in item) { item[key] = item[key][0] }
  item.ex = exchanger.name;
  item.startPage = exchanger.startPage;

  return item;
}

function exArrRefactoring (exArr, exchanger) {
  return _.map(exArr, (eachItem) => { return createExPare(eachItem, exchanger); });
}

const request = https.request(exchenger.url);
request.on('response', handler);
request.end();