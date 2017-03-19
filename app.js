let express = require('express')
let app = express()
let pgp = require('pg-promise')()
let db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'express_todos'
})
let bodyParser = require('body-parser')
let parseUrlencoded = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'))

app.set('view engine', 'pug')

app.get('/todos', function(request, response) {
  db.any('select * from todos')
    .then(data => {
      response.render('index', { title: 'Hey', todos: data })
    })
})

app.post('/todos', parseUrlencoded, function(request, response) {
  let newBlock = request.body
  db.none('insert into todos(title, complete) values($1, $2)', [newBlock.title, false])
  response.status(201).json(newBlock.title)
})

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})
