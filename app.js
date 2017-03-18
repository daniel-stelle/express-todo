let express = require('express')
let app = express()
let pgp = require('pg-promise')()
let db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'express_todos'
})

app.set('view engine', 'pug')

app.get('/', function(request, response) {
  db.any('select * from todos')
    .then(data => {
      response.render('index', { title: 'Hey', todos: data })
    })
})

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})
