const parseString = require('xml2js').parseString;
const theNotes = require('./theNotes');
const fs = require('fs');
const format = require("node.date-time");
const each = require('async-each-series');

function xmlParserFilter(data) {
  return parseString(data, function (err, result) {
    const s = new Set();

    each(result.rates.item, (el, next) => {
      s.add(el.from[0]);
      next();
    },  (err) => {
      s.forEach( currencie => {
        console.log(currencie)
      })
    });
  });
}

module.exports = xmlParserFilter;