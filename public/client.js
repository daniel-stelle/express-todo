$(function() {
  $.get('/todos');

  $('form').on('submit', function(event) {
    event.preventDefault();
    let form = $(this);
    let blockData = $(this).serialize();
    console.log('Blockdata: ', blockData);

    $.ajax({
      type: 'POST', url: '/todos', data: blockData
    }).done(function(todoItem) {
      // db.none('insert into todos(title, complete) values($1, $2)', [blockData])
      location.reload();
      form.trigger('reset');
    });
  });
});
