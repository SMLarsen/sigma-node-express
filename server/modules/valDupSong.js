// function to validate for duplicate songs

function valDupSong(songs, newSong) {
  for (var i = 0; i < songs.length; i++) {
    console.log(songs[i].title, newSong.title);
    if (songs[i].title === newSong.title) {
      return true;
    } 
  }
  return false;
}

module.exports = valDupSong;
