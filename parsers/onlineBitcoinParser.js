const parseString = require('xml2js').parseString;
const fs = require('fs');
const _ = require('lodash');

function onlineBitcoinParser(data, name, from, to, cb) {
  return parseString(data, function (err, resultArr) {
    let result = _.find(resultArr.rates.item, function (item) {
      item.ex = name;
      return item.from[0] === from && item.to[0] === to;
    });
    cb(null, result);
  });
}

module.exports = onlineBitcoinParser;