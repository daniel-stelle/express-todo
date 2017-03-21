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

      $('.todo-items').append(todoItem);
      form.trigger('reset');
    });
  });
});
