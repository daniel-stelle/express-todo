let express = require('express');
let router = express();
let pgp = require('pg-promise')();
let db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'express_todos'
});
const bodyParser = require('body-parser');
const parseUrlencoded = bodyParser.urlencoded({ extended: false });

router.route('/')
  .get(function(request, response) {
    db.any('select * from todos')
      .then(data => {
        response.render('index', { title: 'Hey', todos: data })
      });
  })
  .post(parseUrlencoded, function(request, response) {
    let newBlock = request.body;
    db.none('insert into todos(title, complete) values($1, $2)', [newBlock.title, false]);

    response.status(201).json(newBlock);
  });

router.route('/:id')
  .patch(parseUrlencoded, function(request, response) {
    const todoId = request.params.id;
    db.none('UPDATE todos SET complete = NOT complete WHERE todo_id = ' + todoId);
    console.log('Toggle todo with id #' + todoId + ': UPDATE todos SET complete = NOT complete WHERE todo_id = ' + todoId);

    response.status(200)
  })

module.exports = router;
