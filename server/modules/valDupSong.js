// function to validate for duplicate songs

function valDupSong(songs, newSong) {
  for (var i = 0; i < songs.length; i++) {
    if (songs[i].title === newSong.title) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = valDupSong;
