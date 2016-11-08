// function to validate for duplicate songs

function valDupSong(songs, title) {
  for (var i = 0; i < songs.length; i++) {
    if (songs[i].title === title) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = valDupSong;
