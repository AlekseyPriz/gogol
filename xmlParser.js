const parseString = require('xml2js').parseString;
const theNotes = require('./theNotes');
const fs = require('fs');
const format = require("node.date-time");



function logTime() {
  return new Date().format('y-M-d H:M:S') + ' ';
}
fs.appendFile('readme.log', logTime() + 'Курсы =>' +'\n', (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});

function xmlParser(data) {
  return parseString(data, function (err, result) {
    result.rates.item.forEach((item, i) => {

      fs.appendFile('readme.log', theNotes.logString(item, i), (err) => {
        if (err) throw err;
      });

      theNotes.courseString(item, i);
    })
  });
}

module.exports = xmlParser;