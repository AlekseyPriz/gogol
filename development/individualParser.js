// Переписать используя принцым DRY
const https = require('https');
const path = require('path');
const _ = require('lodash');
////
const parseString = require('xml2js').parseString;
const fs = require('fs');
////
const exchenger = {
    name: 'idram',
   url: 'https://kassa.cc/valuta.xml'
   // url: 'https://idram.armchange.ru/exportxml.xml'
   //  url: 'https://bankcomat.com/valuta.xml'


};
//
function handler(response) {
  let data = '';
  response.on('data', function (chunk) {
    data += chunk;
  });
  response.on('end', function () {
    process(data);
  });
}

function process(data) {
  parseString(data, function (err, resultArr) {
    console.log(exArrRefactoring(resultArr.rates.item));
  })
};

function createExPare(item) {
  for (key in item) {
    item[key] = item[key][0];
  }
  return item;
}

function exArrRefactoring (exArr) {
  return _.map(exArr, (eachItem) => {
    return createExPare(eachItem);
  });
}

const request = https.request(exchenger.url);
request.on('response', handler);
request.end();