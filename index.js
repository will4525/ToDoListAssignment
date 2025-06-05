$(".demo.index").ready(function () {
    var getAndDisplayAllTasks = function () {
        $.ajax({
            type: 'GET',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=2',
            dataType: 'json',
            success: function (response, textStatus) {
                $('#todo-list').empty();
                response.tasks.forEach(function (task) {
                    $('#todo-list').append('<p>' + task.content + '</p>');
                })
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    var createTask = function () {
        $.ajax({
            type: 'POST',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=2',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                task: {
                    content: $('#new-task-content').val()
                }
            }),
            success: function (response, textStatus) {
                $('#new-task-content').val('');
                getAndDisplayAllTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    $('#create-task').on('submit', function (e) {
        e.preventDefault();
        createTask();
    });

    getAndDisplayAllTasks();

});

var deleteTask = function (id) {
    $.ajax({
        type: 'DELETE',
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=2',
        success: function (response, textStatus) {
            getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}

$(document).on('click', '.delete', function () {
    console.log($(this).data('id'))
});