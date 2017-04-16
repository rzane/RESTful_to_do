$(document).ready(function() {

    // send ajax
    $.ajax({
        url: '/task', // url where to submit the request
        type: "GET", // type of action POST || GET
        dataType: 'json', // data type
        success: function(data) {
            console.log('working'),
                populate_page(data)
            // you can see the result from the console
            // tab of the developer tools

        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }

    });

    $('#task-submit').click(function() {
        var name = $('#task-name').val()

        // send ajax
        $.ajax({
            url: '/task/', // url where to submit the request
            type: "POST", // type of action POST || GET
            dataType: 'json', // data type
            contentType: "application/json",
            data: JSON.stringify({
                'name': name
            }),
            success: function(data) {
                console.log(data),

                    populate_page(data)

                // you can see the result from the console
                // tab of the developer tools

            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }

        });

        return false

    });

});


function populate_page(data) {

    $('#task-list').empty()
    $('#task-name').val("")

    $.each(data.tasks, function(index, value) {
        var task = '<li class="test" id=' + value.id + '>' +
            "<p class='task_name'>" + value.name + "</p>" +
            "<button class='delete_task'>" +
            '</li>'
        $(task).appendTo('#task-list')

    });

    $('.delete_task').click(function() {
        var task_id = $(this).parent().attr('id')
        console.log(task_id)

        // send ajax
        $.ajax({
            url: '/task/', // url where to submit the request
            type: "DELETE", // type of action POST || GET
            dataType: 'json', // data type
            contentType: "application/json",
            data: JSON.stringify({
                'id': task_id
            }),
            success: function(data) {
                populate_page(data)

                console.log(data)

                // you can see the result from the console
                // tab of the developer tools

            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }

        });

        return false

    });


}
