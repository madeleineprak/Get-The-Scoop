$(document).on("click", ".navbar-burger", function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
})

$(document).on("click", ".save-article-button", function() {
    var thisId = $(this).attr("data-id");
    console.log(thisId);
    $.ajax({
        type: "POST",
        url: "/save/" + thisId
      })
      .then(function(data) {
        location.reload();
    })
})

$(document).on("click", ".unsave-article-button", function() {
    var thisId = $(this).attr("data-id");
    console.log(thisId);
    $.ajax({
        type: "POST",
        url: "/delete/" + thisId
      })
      .then(function(data) {
        location.reload();
    })
})

// Whenever someone clicks a p tag
$(document).on("click", ".notes-button", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
    
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        console.log(data);
        $("#notes").append("<h2>" + data.title + "</h2>");
        $("#notes").append("<input id='titleinput' name='title' class='input' type='text'>");
        $("#notes").append("<textarea class='textarea' id='bodyinput' name='body'></textarea>");
        $("#notes").append("<a class='button is-light savenote' data-id='" + data._id + "'>Save Note</a>");
        $("#notes").append("<a class='button is-danger deletenote' data-id='" + data.note._id + "'>Delete Note</a>");
  
        // If there's a note in the article
        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        }
      });
});
  
// When you click the savenote button
$(document).on("click", ".savenote", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
        }
    })
        .then(function(data) {
        console.log(data);
        $("#notes").empty();
        });
    $("#titleinput").val("");
    $("#bodyinput").val("");
});

$(document).on("click", ".deletenote", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/deletenote/" + thisId
    })
        .then(function(data) {
        $("#notes").empty();
        $("#titleinput").val("");
        $("#bodyinput").val("");
        location.reload();
        });
});

$(document).on("click", ".clear-button", function() {
    $("#articles").empty();
})

$(document).on("click", ".scrape-button", function() {
    window.location = "/scrape"
})