const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');

const todos = require('./routes/todos');
app.use('/todos', todos);

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
