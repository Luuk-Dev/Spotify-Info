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
The `scrapeSong` function returns a `Promise`, once this is fullfilled, it will return the `ScrapedSong` class. The `ScrapedSong` class has the following properties:

| Property       | Description                                                                                   |
|----------------|-----------------------------------------------------------------------------------------------|
| name           | The name of the song.                                                                         |
| id             | The id of the song on Spotify.                                                                |
| artist         | The artist of the song.                                                                       |
| artistUrl      | The url of the artist of the song on Spotify.                                                 |
| artistId       | The id of the artist of the song on Spotify.                                                  |
| description    | The description of the song on Spotify.                                                       |
| publishDate    | The date when the song got published on Spotify.                                              |
| locations      | An array of country codes of the countries where the song can be played on Spotify.           |
| url            | The url of the song on Spotify.                                                               |
| embedUrl       | The embed url of the song on Spotify.                                                         |

## Get playlist information
To get a playlist it's information, you can scrape the Spotify page by using the `scrapePlaylist` function. The function has one argument which is the url of the playlist.
```js
const spotifyInfo = require('spotify-info');

spotifyInfo.scrapePlaylist('https://open.spotify.com/playlist/5pI2mpzVD945Ni9aEB1veE').then(song => console.log(song.name)).catch(console.log);
```
The `scrapePlaylist` function returns a `Promise`, once this is fullfilled, it will return the `ScrapedPlaylist` class. The `ScrapedPlaylist` class has the following properties:

| Property       | Description                                                                                   |
|----------------|-----------------------------------------------------------------------------------------------|
| name           | The name of the playlist on Spotify.                                                          |
| id             | The id of the playlist on Spotify.                                                            |
| creator        | The username of the creator of the playlist on Spotify.                                       |
| creatorId      | The id of the creator of the playlist on Spotify.                                             |
| creatorUrl     | The url of the creator of the playlist on Spotify.                                            |
| thumbnail      | The image which is used as the thumbnail for the playlist on Spotify.                         |
| locations      | An array of country codes of the countries where the playlist can be played on Spotify.       |
| description    | The description of the playlist on Spotify.                                                   |
| url            | The url of the playlist on Spotify.                                                           |
| embedUrl       | The embed url of the playlist on Spotify.                                                     |
| songs          | An array of the songs in the playlist, the songs make use of the `ScrapedPlaylistSong` class. |

## Get album information
To get an album it's information, you can scrape the Spotify page by using the `scrapeAlbum` function. The function has one argument which is the url of the album.
```js
const spotifyInfo = require('spotify-info');

spotifyInfo.scrapeAlbum('https://open.spotify.com/album/5Z9iiGl2FcIfa3BMiv6OIw').then(song => console.log(song.name)).catch(console.log);
```
The `scrapeAlbum` function returns a `Promise`, once this is fullfilled, it will return the `scrapeAlbum` class. The `scrapeAlbum` class has the following properties:

| Property       | Description                                                                                   |
|----------------|-----------------------------------------------------------------------------------------------|
| name           | The name of the album.                                                                        |
| id             | The id of the album on Spotify.                                                               |
| url            | The url of the album on Spotify.                                                              |
| artist         | The username of the artist of the album on Spotify.                                           |
| artistId       | The id of the artist of the album on Spotify.                                                 |
| artistUrl      | The url of the artist of the album on Spotify.                                                |
| thumbnail      | The image which is used as the thumbnail for the album on Spotify.                            |
| locations      | An array of country codes of the countries where the album can be played on Spotify.          |
| description    | The description of the album on Spotify.                                                      |
| embedUrl       | The embed url of the album on Spotify.                                                        |
| songs          | An array of the songs in the album, the songs make use of the `ScrapedPlaylistSong` class.    |

### The ScrapedPlaylistSong class
The `ScrapedPlaylistSong` class is used for songs in the `ScrapedPlaylist` class and for songs in the `ScrapedAlbum` class. The properties of the `ScrapedPlaylistSong` class are:

| Property       | Description                                                                                   |
|----------------|-----------------------------------------------------------------------------------------------|
| name           | The name of the song.                                                                         |
| artist         | The name of the artist of the song on Spotify.                                                |
| duration       | The duration of the song in miliseconds.                                                      |
| durationString | The duration of the song as a string.                                                         |
