$(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    const form = $(this);
    const todoData = $(this).serialize();

    $.ajax({
      type: 'POST', url: '/todos', data: todoData
    }).done(function(data) {
      console.log(data);
      const todoItem = $('<li></li>')
        .text(data.title + ': false')
        .prepend(
          $('<input type="checkbox" />')
            .data('todo-id', data.todo_id)
        )

      $('.todo-items').append(todoItem);
      form.trigger('reset');
    });
  });

  $('input:checkbox').change(function(event) {
    event.preventDefault();
    const todoId = $(this).data('todo-id');

    $.ajax({
      type: 'PATCH', url: '/todos/' + todoId
    }).done(function() {
      location.reload();
    })
  })
});
