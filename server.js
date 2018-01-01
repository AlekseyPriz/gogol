const express = require('express');
const app = express();
const routes = require('./routes/routes');
const path = require('path');
const normalizePort = require('./scripts/normalizePort');

const port = normalizePort(process.env.PORT || '3000');

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/angular', express.static(path.join(__dirname, '/angular')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/static/index.html'));
});
app.get('/start', routes.start);
app.get('/singl', routes.single);
app.get('/exchange/:from/:to', routes.group);
app.get('/big', routes.bigArr);

app.listen(port, function () {
  console.log('Приложение запущено на порту: ', port);
});


