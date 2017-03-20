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
      form.trigger('reset');
      location.reload();
    });
  });
});
