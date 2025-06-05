$(document).ready(function () {
    const apiKey = '2';
    const baseUrl = 'https://fewd-todolist-api.onrender.com/tasks';

    const createTask = function () {
        $.ajax({
            type: 'POST',
            url: `${baseUrl}?api_key=${apiKey}`,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                task: {
                    content: $('#new-task-content').val()
                }
            }),
            success: function (response) {
                $('#new-task-content').val('');
                const task = response.task;
                $('#todo-list').append(`
          <div class="row">
            <p class="col-xs-8">${task.content}</p>
            <button class="delete btn btn-danger btn-xs" data-id="${task.id}">Delete</button>
            <label>
              <input type="checkbox" class="mark-complete" data-id="${task.id}">
              Complete
            </label>
          </div>
        `);
            },
            error: function (_, __, errorMessage) {
                console.log('POST error:', errorMessage);
            }
        });
    };

    const deleteTask = function (id) {
        $.ajax({
            type: 'DELETE',
            url: `${baseUrl}/${id}?api_key=${apiKey}`,
            success: function () {
                // Optionally remove from DOM
                $(`[data-id='${id}']`).closest('.row').remove();
            },
            error: function (_, __, errorMessage) {
                console.log('DELETE error:', errorMessage);
            }
        });
    };

    const markTaskComplete = function (id) {
        $.ajax({
            type: 'PUT',
            url: `${baseUrl}/${id}/mark_complete?api_key=${apiKey}`,
            dataType: 'json',
            error: function (_, __, errorMessage) {
                console.log('Complete error:', errorMessage);
            }
        });
    };

    const markTaskActive = function (id) {
        $.ajax({
            type: 'PUT',
            url: `${baseUrl}/${id}/mark_active?api_key=${apiKey}`,
            dataType: 'json',
            error: function (_, __, errorMessage) {
                console.log('Active error:', errorMessage);
            }
        });
    };

    $('#create-task').on('submit', function (e) {
        e.preventDefault();
        createTask();
    });

    $(document).on('click', '.delete', function () {
        const id = $(this).data('id');
        deleteTask(id);
    });

    $(document).on('change', '.mark-complete', function () {
        const id = $(this).data('id');
        if (this.checked) {
            markTaskComplete(id);
        } else {
            markTaskActive(id);
        }
    });

});
