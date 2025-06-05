$(document).ready(function () {
    $('#create-task').on('submit', function (e) {
        e.preventDefault();
        createTask();
    });
});

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
            console.log('Success:', response);
        },
        error: function (request, textStatus, errorMessage) {
            console.error('Error:', errorMessage);
        }
    });
};
