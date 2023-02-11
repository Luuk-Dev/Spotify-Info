# Spotify Info
A library to receive information about Spotify songs and playlists without a token.

## Validate url's
To validate a Spotify url, you can use different functions, depending on the type of url you would like to validate. The available functions are:
* `validateSpotifyURL`: Checks whether the url is Spotify URL or not
* `validateSongURL`: Checks whether the url is from a song on Spotify or not
* `validateArtistURL`: Checks whether the url is from an artist on Spotify or not
* `validateAlbumURL`: Checks whether the url is from an album on Spotify or not
* `validatePlaylistURL`: Checks whether the url is from a playlist on Spotify or not

If the url is valid, the function will return `true`, if not, the function will return `false`.

```js
const spotifyInfo = require('spotify-info');

console.log(spotifyInfo.validateSpotifyURL('https://open.spotify.com/playlist/5pI2mpzVD945Ni9aEB1veE')); // Returns true

console.log(spotifyInfo.validateSongURL('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT')) // Returns true

console.log(spotifyInfo.validateArtistURL('https://open.spotify.com/artist/0gxyHStUsqpMadRV0Di1Qt')) // Returns true

console.log(spotifyInfo.validateAlbumURL('https://open.spotify.com/album/5Z9iiGl2FcIfa3BMiv6OIw')) // Returns true

console.log(spotifyInfo.validatePlaylistURL('https://open.spotify.com/playlist/5pI2mpzVD945Ni9aEB1veE')) // Returns true
```

## Get song information
To get a song it's information, you can scrape the Spotify page by using the `scrapeSong` function. The function has one argument which is the url of the song.
```js
const spotifyInfo = require('spotify-info');

spotifyInfo.scrapeSong('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT').then(song => console.log(song.name)).catch(console.log);
```

## Get playlist information
To get a playlist it's information, you can scrape the Spotify page by using the `scrapePlaylist` function. The function has one argument which is the url of the playlist.
```js
const spotifyInfo = require('spotify-info');

spotifyInfo.scrapePlaylist('https://open.spotify.com/playlist/5pI2mpzVD945Ni9aEB1veE').then(song => console.log(song.name)).catch(console.log);
```
