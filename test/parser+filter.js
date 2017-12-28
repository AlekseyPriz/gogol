const https = require('https');
const exchangers = require('../exchangers/exchangers');
const parseString = require('xml2js').parseString;
const theNotes = require('../theNotes');
const fs = require('fs');
const _ = require('lodash');

function handler(response) {
  let data = '';
  response.on('data', function (chunk) {
    data += chunk; });
  response.on('end', function () {
    process(data, exchangers[0].name);
  });
}
function process(data, name) {
  parseString(data, function (err, resultArr) {
    console.log(_.find(resultArr.rates.item, function (item) {
      return item.from[0] === 'BTC' && item.to[0] ==='CARDRUB';
    }));

  });

}

// const request = https.request(exchangers[0].url);
// request.on('response', handler);
// request.end();
//
//
//
// if (!result.rates) {
//   return cb(null, {err: 'Нет данных'});
// } else {
//
//   // result.rates.item.forEach((item) => {
//   //     if (item.from[0] === 'BTC' && item.to[0] ==='CARDRUB') {
//   //       cb(null, theNotes.btcCardRubObj(item, name));
//   //     }
//   // })
//
//   return cb(null, (result) => {
//     return result.filter((item) => {
//       if (item.from[0] === 'BTC' && item.to[0] ==='CARDRUB') {
//         return true
//       }
//
//     })}
//   );
// }


