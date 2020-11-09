var isItImportant = false; //flag
var detailsVisible = true;
var server = "http://fsdi.azurewebsites.net/api";
function toggleImportant() {
    if (isItImportant) {
        $("#iconImp").removeClass('fas').addClass('far');
        isItImportant = false;
    }
    else {
        $("#iconImp").removeClass('far').addClass('fas');
        isItImportant = true;
    }
}


function toggleDetails() {
    if (detailsVisible) {
        $("#section-form").hide();
        detailsVisible = false;
    }
    else {
        $("#section-form").show();
        detailsVisible = true;
    }
}


$("#btnShowDetails").click(function (event) {
    var x = $(this).text()
    if (x == "Hide details") {
        $(this).text("Show details").removeClass('far fa-eye-slash').addClass('fas fa-eye')
    }
    else {
        $(this).text("Hide details").addClass('far fa-eye-slash')
    }
})

function createTask() {
    //get values from inputs
    var title = $("#title").val();
    var dueDate = $("#date").val();
    var desc = $("#description").val();
    var location = $("#location").val()

    //apply validations
    if (title.length < 5) {
        $("#alertError").show();
        //start a timer to hide it
        //arrow function
        setTimeout(() => $("#alertError").hide(), 5000);
        return; //
    }

    //create an object
    var task = new Task(title, isItImportant, dueDate, desc, location);
    console.log(task);

    //send object to server
    $.ajax({
        type: 'POST',
        url: server + '/tasks',
        data: JSON.stringify(task),
        contentType: 'application/json',
        success: function (res) {
            console.log("Server says:", res);
        },
        error: function (details) {
            console.log("Error:", details);
        }
    })

    //display tasks
    displayTask(task);
    //clear the form
    clear();
}

function displayTask(task) {
    var cssClass = '';
    if (task.important) cssClass = 'fas';
    else cssClass = 'far';

    var syntax =
        `<div class='task'>
        <i class="${cssClass} far fa-star task-section"></i>
        <div class='task-desc'>
        <h5>${task.title}<h5>
        <label>${task.description}</label>
        </div>
        <label class='task-section'>${task.dueDate}</label>
        <label class='task-section'>${task.location}</label>
    </div>`;
    $("#pendingTasks").append(syntax);

}

function clear() {
    $("#title").val('');
    $("#date").val('');
    $("#description").val('');
    $("#location").val('');
    if (isItImportant) {
        //change the value
        toggleImportant();
    }

}







function init() {
    console.log("My Calendar");

    toggleDetails();


    // load data
    //hook events
    $("#iconImp").click(toggleImportant);
    $("#btnShowDetails").click(toggleDetails);
    $("#btn-save").click(createTask);

    $("#alertError").hide();
}

function testGet() {
    $.ajax({
        type: 'GET',
        url: 'https://restclass.azurewebsites.net/api/test',
        success: function (res) {
            console.log("Succeed", res);
        },
        error: function (details) {
            console.log("Error:(", details);
        }
    });
}



window.onload = init;

/**
 *
 *
 * hide the alertError when page loads
 * show it when there is an error
 *
 *
 * http requests
 * http methods
 * http status codes
 *
 *
 *
 */