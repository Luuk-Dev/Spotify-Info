const { decodeHTMLEntities } = require('./functions.js');

function playlistExtractor(res){
    let tracks = res.split('<li ');
    tracks.shift();

    let playlistTracks = [];

    for(var i = 0; i < tracks.length; i++){
        var track = tracks[i];
        let trackContent = track.split(">").slice(1).join(">").split("</li>")[0];
        let trackName = trackContent.split("<h3")[1].split(">").slice(1).join(">").split("</h3>")[0];
        let trackArtist = trackContent.split("<h4")[1].split(">").slice(1).join(">").split("</h4>")[0];
        if(trackArtist.indexOf('</span>') >= 0) trackArtist = trackArtist.split("</span>")[1];
        let trackLengthString = trackContent.split("<div")[2].split(">").slice(1).join(">").split("</div>")[0];
        let trackLength = 0;
        let splittedTrackLength = trackLengthString.split(":");
        splittedTrackLength.reverse();
        for(var z = 0; z < splittedTrackLength.length; z++){
            var numb = parseInt(splittedTrackLength[z]);
            if(z < 3){
                trackLength += numb * 60**z * 1000;
            } else if(z === 3){
                trackLength += numb * 24 * 60**2 * 1000;
            }
        }
        try{
            trackName = decodeURI(trackName);
        } catch {}
        try{
            trackArtist = decodeURI(trackArtist);
        } catch {}
        playlistTracks.push({
            name: decodeHTMLEntities(trackName),
            artist: decodeHTMLEntities(trackArtist),
            lengthString: trackLengthString,
            length: trackLength
        });
    }
    
    return playlistTracks;
}

function playlistExtractorJson(res){
    let playlistTracks = [];

    for(var i = 0; i < res.length; i++){
        let song = res[i];
        let seconds = Math.round(song.duration / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        minutes = minutes - hours*60;
        seconds = seconds - hours*60*60 - minutes*60;

        let durationString = `${seconds}`;
        if(minutes > 0) durationString = `${minutes}:${durationString}`;
        if(hours > 0) durationString = `${hours}:${durationString}`;

        playlistTracks.push({
            name: song.title,
            artist: song.subtitle,
            lengthString: durationString,
            length: song.duration
        });
    }

    return playlistTracks;
}

module.exports = { playlistExtractor, playlistExtractorJson };
