const { decodeHTMLEntities } = require('./functions.js');

function playlistExtractor(res){
    let songs = res.split('<li ');
    songs.shift();

    let playlistSongs = [];

    for(var i = 0; i < songs.length; i++){
        var song = songs[i];
        let songContent = song.split(">").slice(1).join(">").split("</li>")[0];
        let songName = songContent.split("<h3")[1].split(">").slice(1).join(">").split("</h3>")[0];
        let songArtist = songContent.split("<h4")[1].split(">").slice(1).join(">").split("</h4>")[0];
        if(songArtist.indexOf('</span>') >= 0) songArtist = songArtist.split("</span>")[1];
        let songLengthString = songContent.split("<div")[2].split(">").slice(1).join(">").split("</div>")[0];
        let songLength = 0;
        let splittedSongLength = songLengthString.split(":");
        splittedSongLength.reverse();
        for(var z = 0; z < splittedSongLength.length; z++){
            var numb = parseInt(splittedSongLength[z]);
            if(z < 3){
                songLength += numb * 60**z * 1000;
            } else if(z === 3){
                songLength += numb * 24 * 60**2 * 1000;
            }
        }
        try{
            songName = decodeURI(songName);
        } catch {}
        try{
            songArtist = decodeURI(songArtist);
        } catch {}
        playlistSongs.push({
            name: decodeHTMLEntities(songName),
            artist: decodeHTMLEntities(songArtist),
            lengthString: songLengthString,
            length: songLength
        });
    }
    
    return playlistSongs;
}

module.exports = {playlistExtractor};
