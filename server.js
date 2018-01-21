const express = require('express');
const app = express();
const routes = require('./routes/routes');
const path = require('path');
const normalizePort = require('./scripts/normalizePort');

const port = normalizePort(process.env.PORT || '3000');

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/angular', express.static(path.join(__dirname, '/angular')));


///// запуск краулера

// let crauler = require('./crauler');
// let craulerData;
//
// setInterval(() => {
//   crauler((err, result) => {
//     craulerData = result;
//     console.log('Результат Краулера из server.js');//, result);
//   });
// //},600000);
// },10000);



///// конец краулера

app.get('/', function(req, res) { res.sendFile(path.join(__dirname + '/static/index.html'));});
// app.get('/', routes.main());

app.get('/start', routes.start); // на выходе массив курсов биткоина в доллары
app.get('/singl', routes.single); // на выходе курс конкретной пары
app.get('/exchange/:from/:to', routes.group); // на выходе курс конкретной пары от нескольких обменников
app.get('/big', routes.bigArr); // на выходе один массив данных со всеми курсами со всех обменников
app.get('/crlr', function(req, res) {
  //console.log(craulerData)
  res.json( craulerData );
}); //


app.listen(port, function () {
  console.log('Приложение запущено на порту: ', port);
});


