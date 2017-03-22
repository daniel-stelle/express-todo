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
    db.any('SELECT * FROM todos ORDER BY todo_id')
      .then(data => {
        response.render('index', { title: 'Express Todos', todos: data })
      });
    console.log('Get todos: SELECT * FROM todos');
  })
  .post(parseUrlencoded, function(request, response) {
    const newBlock = request.body;

    db.none('INSERT INTO todos(title, complete) VALUES($1, $2)', [newBlock.title, false]);
    console.log('Add todo: INSERT INTO todos(title, complete) VALUES($1, $2)');

    response.status(201).json(newBlock);
  });

router.route('/:id')
  .patch(parseUrlencoded, function(request, response) {
    const todoId = request.params.id;

    db.none('UPDATE todos SET complete = NOT complete WHERE todo_id = ' + todoId);
    console.log('Toggle todo with id #' + todoId + ': UPDATE todos SET complete = NOT complete WHERE todo_id = ' + todoId);

    response.sendStatus(200);
  })
  .delete(function(request, response) {
    const todoId = request.params.id;

    db.one('DELETE FROM todos WHERE todo_id = ' + todoId);
    console.log('Delete todo with id #' + todoId + ': DELETE FROM todos WHERE todo_id = ' + todoId);

    response.status(200).end();
  })

module.exports = router;
