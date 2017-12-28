const parseString = require('xml2js').parseString;
const theNotes = require('./theNotes');
const fs = require('fs');

function xmlParser(data) {
  return parseString(data, function (err, result) {
    result.rates.item.forEach((item) => {
      if (item.from[0] === 'BTC' && item.to[0] ==='CARDRUB') {
        fs.appendFile('BTC-CARDRUB.log', theNotes.btcCardrub(item), (err) => {
          if (err) throw err;
        });
      } //else return
    })
  });
}

module.exports = xmlParser;