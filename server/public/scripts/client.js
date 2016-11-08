$(document).ready(function() {
  console.log("it's alive!");

  $("#postSongForm").on("submit", function(event) {
    event.preventDefault();
    var newSong = {};

    $.each($('#postSongForm').serializeArray(), function(i, field) {
      newSong[field.name] = field.value;
    });

    console.log(newSong);

    if (validateInput(newSong)) {

      // send song object to the Server
      $.ajax({
        type: 'POST',
        url: '/songs',
        data: newSong,
        success: function(response) {
          console.log(response);
          getSongs();
        },
        error: function(error) {
          alert("Oh no! Your song didn't save correctly.");
        }
      });

    }

  });

  getSongs();

  function getSongs() {
    $.ajax({
      type: 'GET',
      url: '/songs',
      success: function(songData) {
        songsToDom(songData);
      }
    });
  }

  function songsToDom(songs) {
    $("#songContainer").empty();

    for (var i = 0; i < songs.length; i++) {
      $("#songContainer").append('<div class="song"></div>');
      var $el = $("#songContainer").children().last();
      $el.append('<h3>' + songs[i].title + '</h3>');
      $el.append('<p>By: ' + songs[i].artist + '</p>');
      $el.append('<p>Date Added: ' + songs[i].dateAdded + '</p>');
    }

  }

  function validateInput(newSong) {
    console.log('validateInput song', newSong);
    if (newSong.artist === "" || newSong.title === "") {
      alert("Artist and Title must be entered.");
      console.log(false);
      return false;
    } else {
      console.log(true);
      return true;
    }
  }


});
