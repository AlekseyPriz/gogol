const express = require('express');
const app = express();
const routes = require('./routes/routes');
const path = require('path');

const port = normalizePort(process.env.PORT || '3000');

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/angular', express.static(path.join(__dirname, '/angular')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/static/index.html'));
});
app.get('/start', routes.start);
app.get('/singl', routes.single);
app.get('/exchange/:from/:to', routes.group);


app.listen(port, function () {
  console.log('Example app listening on port ', port);
});


