$(document).ready(function() {

    getSongs(); // get songs to load on initial display

    // =============  listeners  =================================
    $("#postSongForm").on("submit", function(event) {
        event.preventDefault();
        var newSong = {};

        $.each($('#postSongForm').serializeArray(), function(i, field) {
            newSong[field.name] = field.value;
        });

        addNewSong(newSong);
    });

    // get songs from server
    function getSongs() {
        $.ajax({
            type: 'GET',
            url: '/songs',
            success: function(songData) {
                songsToDom(songData);
            }
        });
    }

    // validate and add new song to server array
    function addNewSong(newSong) {
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
    }

    // load songs from server on the DOM
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

    // client-side validation for empty input fields
    function validateInput(newSong) {
        if (newSong.artist === "" || newSong.title === "") {
            alert("Artist and Title must be entered.");
            return false;
        } else {
            return true;
        }
    }

});
