const parseString = require('xml2js').parseString;
const theNotes = require('../theNotes');
const fs = require('fs');

function xmlParserBitcoinGroup(data, name) {
  return parseString(data, function (err, result) {
    result.rates.item.forEach((item) => {
      if (item.from[0] === 'BTC' && item.to[0] ==='CARDRUB') {
        fs.appendFile('group.log', theNotes.btcCardrubGroup(item, name), (err) => {
          if (err) throw err;
        });
      }
    })
  });
}

module.exports = xmlParserBitcoinGroup;