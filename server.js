const express = require('express');
const app = express();
const routes = require('./routes/routes');
const path = require('path');

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/angular', express.static(path.join(__dirname, '/angular')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/static/index.html'));
});
app.get('/start', routes.start);
app.get('/singl', routes.single);
app.get('/exchange/:from/:to', routes.group);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


