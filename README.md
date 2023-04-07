# Spotify Info
A library to receive information about Spotify songs and playlists with and without using the API.

## Table of contents:
<div style="border: 1px solid gray; padding: 4px;">
    <ul>
        <li><a href="#validate-urls">Validate Spotify url's</a></li>
        <li><a href="#get-information-with-the-spotify-api">Get information with the Spotify API</a></li>
        <ul>
            <li><a href="#get-song-information">Get information about songs</a></li>
            <li><a href="#get-playlist-information">Get information about playlists</a></li>
            <li><a href="#get-album-information">Get information about albums</a></li>
            <li><a href="#get-artist-information">Get information about artists</a></li>
            <li><a href="#search">Search for songs, playlists, albums and artists</a></li>
        </ul>
        <li><a href="#get-information-without-the-spotify-api">Get information without the Spotify API</a>
        <ul>
            <li><a href="#get-song-information-1">Get information about songs</a></li>
            <li><a href="#get-playlist-information-1">Get information about playlists</a></li>
            <li><a href="#get-album-information-1">Get information about albums</a></li>
        </ul>
    </ul>
</div>

## Validate url's
To validate a Spotify url, you can use different functions, depending on the type of url you would like to validate. The available functions are:
* `validateSpotifyURL`: Checks whether the url is Spotify URL or not
* `validateTrackURL`: Checks whether the url is from a song on Spotify or not
* `validateArtistURL`: Checks whether the url is from an artist on Spotify or not
* `validateAlbumURL`: Checks whether the url is from an album on Spotify or not
* `validatePlaylistURL`: Checks whether the url is from a playlist on Spotify or not

If the url is valid, the function will return `true`, if not, the function will return `false`.

```js
const spotifyInfo = require('spotify-info');

console.log(spotifyInfo.validateSpotifyURL('https://open.spotify.com/playlist/5pI2mpzVD945Ni9aEB1veE')); // Returns true

console.log(spotifyInfo.validateTrackURL('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT')) // Returns true

console.log(spotifyInfo.validateArtistURL('https://open.spotify.com/artist/0gxyHStUsqpMadRV0Di1Qt')) // Returns true

console.log(spotifyInfo.validateAlbumURL('https://open.spotify.com/album/5Z9iiGl2FcIfa3BMiv6OIw')) // Returns true

console.log(spotifyInfo.validatePlaylistURL('https://open.spotify.com/playlist/5pI2mpzVD945Ni9aEB1veE')) // Returns true
```

## Get information with the Spotify API
The Spotify Info package allows you since the release of version 1.0.8 to use the Spotify API to receive information about songs, playlists, albums and artists. The Spotify API provides more information, is faster and has less risks of unable to functionate than the scrape functions. To make use of the you need a client id and client secret. These credentials can be received on the [Spotify developer dashboard page](https://developer.spotify.com/dashboard) by creating a new application and then by clicking the `Settings` button.

### Using your credentials
The Spotify Info package needs the credentials of your application to be able to make requests to the Spotify API. These credentials can be set by using the `setApiCredentials` function. The first argument is the Client ID of your application and the second argument is the Client Secret of your application. The api credentials will be saved global so you don't have to define them in every file. The credentials can also be set by using the environmental variables `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`. These credentials **must** be set to be able to make use of the API functions. If you don't want to use credentials, you can make use of the [scrape functions](#get-information-without-the-spotify-api). This is an example of how to set your credentials:
```js
const spotifyInfo = require('spotify-info');

spotifyInfo.setApiCredentials('my-client-id', 'my-client-secret');
```

### Get song information
You can get information about a song by making use of the `getTrack` function. The function has two arguments. The first argument is the url or id of the song. The url may be an embed url, song url or an api url. The second argument is the options argument which is optional. The options in the options argument are:
* market: The country code of the country where you want to get the available information about the track from. By default the one will be used which is linked to your account.
```js
const spotifyInfo = require('spotify-info');

spotifyInfo.getTrack('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT').then(res => console.log(res.name)).catch(console.log);
```
The `getTrack` function returns a `Promise`, once this is fullfilled, it will return the `ApiTrack` class. The `ApiTrack` class has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the song.                                                                                                                      |
| id             | The id of the song on Spotify.                                                                                                             |
| uri            | The uri of the song on Spotify.                                                                                                            |
| url            | The url of the song on Spotify.                                                                                                            |
| discNumber     | The disc number of the song on Spotify (mostly 1).                                                                                         |
| trackNumber    | The track number of the song on Spotify.                                                                                                   |
| embedUrl       | The embed url of the song on Spotify.                                                                                                      |
| artists        | An array of the artists [(base artist object)](#base-artist-object).                                                                       |
| album          | An object of the album the song is in [(base album object)](#base-album-object).                                                           |
| explicit       | Whether the song is explicit or not.                                                                                                       |
| popularity     | A number between 0-100 with 100 being the most popular (nullable).                                                                         |
| duration       | The duration of the song in miliseconds.                                                                                                   |
| previewUrl     | A url of a preview of the song (nullable).                                                                                                 |
| locations      | An array of country codes of the countries where the song is available on Spotify.                                                         |

### Get playlist information
You can get information about a playlist by making use of the `getPlaylist` function. The function has two arguments. The first argument is the url or id of the playlist. The url may be an embed url, playlist url or an api url. The second argument is the options argument which is optional. The options in the options argument are:
* market: The country code of the country where you want to get the available information about the playlist from. By default the one will be used which is linked to your account.
```js
const spotifyInfo = require('spotify-info');

spotifyInfo.getPlaylist('https://open.spotify.com/playlist/5pI2mpzVD945Ni9aEB1veE').then(res => console.log(res.name)).catch(console.log);
```
The `getPlaylist` function returns a `Promise`, once this is fullfilled, it will return the `ApiPlaylist` class. The `ApiPlaylist` class has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the playlist.                                                                                                                  |
| id             | The id of the playlist on Spotify.                                                                                                         |
| uri            | The uri of the playlist on Spotify.                                                                                                        |
| url            | The url of the playlist on Spotify.                                                                                                        |
| images         | An array of images of the cover of the playlist [(base image object)](#base-image-object).                                                 |
| owner          | An object of the owner of the playlist [(base image object)](#base-owner-object).                                                          |
| embedUrl       | The embed url of the playlist on Spotify.                                                                                                  |
| artists        | An array of the artists [(base artist object)](#base-artist-object).                                                                       |
| collaborative  | Whether the owner of the playlist allows others to modify the playlist or not.                                                             |
| public         | Whether the playlist is public or not.                                                                                                     |
| description    | The descripition of the playlist (`null` for non-modified and non-verified playlists).                                                     |
| followers      | The amount of followers of the playlist.                                                                                                   |
| previewUrl     | A url of a preview of the song (nullable).                                                                                                 |
| locations      | An array of country codes of the countries where the song is available on Spotify.                                                         |
| tracks         | An array of the songs in the playlist [(base track object)](#base-track-object).                                                           |

### Get album information
You can get information about an album by making use of the `getAlbum` function. The function has two arguments. The first argument is the url or id of the album. The url may be an embed url, album url or an api url. The second argument is the options argument which is optional. The options in the options argument are:
* market: The country code of the country where you want to get the available information about the album from. By default the one will be used which is linked to your account.
```js
const spotifyInfo = require('spotify-info');

spotifyInfo.getAlbum('https://open.spotify.com/album/5Z9iiGl2FcIfa3BMiv6OIw').then(res => console.log(res.name)).catch(console.log);
```
The `getAlbum` function returns a `Promise`, once this is fullfilled, it will return the `ApiAlbum` class. The `ApiAlbum` class has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the album.                                                                                                                     |
| id             | The id of the album on Spotify.                                                                                                            |
| uri            | The uri of the album on Spotify.                                                                                                           |
| url            | The url of the album on Spotify.                                                                                                           |
| locations      | An array of country codes of the countries where the album is available on Spotify.                                                        |
| images         | An array of images of the cover of the album [(base image object)](#base-image-object).                                                    |
| embedUrl       | The embed url of the album on Spotify.                                                                                                     |
| artists        | An array of the artists who participated in the album [(base artist object)](#base-artist-object).                                         |
| type           | The type of the album (album, single or compilation).                                                                                      |
| totalTracks    | The total amount of songs in the album.                                                                                                    |
| release        | The date when the album got released.                                                                                                      |
| copyrights     | An array of the copyrights that count for the album.                                                                                       |
| genres         | An array of genres the album belongs to.                                                                                                   |
| label          | The label associated to the album (nullable).                                                                                              |
| tracks         | An array of the songs in the album [(base track object)](#base-track-object).                                                              |
| popularity     | A number between 0-100 with 100 being the most popular (nullable).                                                                         |

### Get artist information
You can get information about an artist by making use of the `getArtist` function. The function has one argument. The argument is the url or id of the artist. The url may be an embed url, artist url or an api url.
```js
const spotifyInfo = require('spotify-info');

spotifyInfo.getArtist('https://open.spotify.com/artist/0gxyHStUsqpMadRV0Di1Qt').then(res => console.log(res.name)).catch(console.log);
```
The `getArtist` function returns a `Promise`, once this is fullfilled, it will return the `ApiArtist` class. The `ApiArtist` class has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the artist.                                                                                                                    |
| id             | The id of the artist on Spotify.                                                                                                           |
| uri            | The uri of the artist on Spotify.                                                                                                          |
| url            | The url of the artist on Spotify.                                                                                                          |
| images         | An array of images of the cover of the album [(base image object)](#base-image-object).                                                    |
| embedUrl       | The embed url of the artist on Spotify.                                                                                                    |
| followers      | The amount of followers the artist has.                                                                                                    |
| copyrights     | An array of the copyrights that count for the album.                                                                                       |
| genres         | An array of genres the album belongs to.                                                                                                   |
| popularity     | A number between 0-100 with 100 being the most popular (nullable).                                                                         |

### Search
You can also search for songs, playlists, albums and artists by using the `search` function. The function has two arguments. The first argument is the query or api url where you want to search the song, playlist, album or artist with. The second argument is the options argument which is required in this case. The options in the options argument are:
* type: An array of the type you're looking for (can be track, playlist, album or artist, by default all of them are enabled).
* offset: The index of the first result to return.
* limit: The maximum number of results to return in each item type (range 0-50).
* market: The country code of the country where you want to get the available information about the type you're looking for from. By default the one will be used which is linked to your account.
```js
const spotifyInfo = require('spotify-info');

spotifyInfo.search('Never Gonna Give You Up', {
    type: ['artist'],
    offset: 0,
    limit: 1,
    market: 'US'
}).then(res => console.log(res.name)).catch(console.log);
```
The `search` function returns a `Promise`, once this is fullfilled, it will return the `SearchResult` class. The `SearchResult` class has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| tracks         | The tracks that have been found with the query. [(base search result object)](#base-search-result-object).                                 |
| playlists      | The playlists that have been found with the query. [(base search result object)](#base-search-result-object).                              |
| albums         | The albums that have been found with the query. [(base search result object)](#base-search-result-object).                                 |
| artists        | The artists that have been found with the query. [(base search result object)](#base-search-result-object).                                |

### Base artist object
The base artist object has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the artist.                                                                                                                    |
| id             | The id of the artist on Spotify.                                                                                                           |
| uri            | The uri of the artist on Spotify.                                                                                                          |
| url            | The url of the artist on Spotify.                                                                                                          |

### Base owner object
The base owner object has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the owner.                                                                                                                     |
| id             | The id of the owner on Spotify.                                                                                                            |
| uri            | The uri of the owner on Spotify.                                                                                                           |
| url            | The url of the owner on Spotify.                                                                                                           |

### Base album object
The base album object has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the album.                                                                                                                     |
| id             | The id of the album on Spotify.                                                                                                            |
| uri            | The uri of the album on Spotify.                                                                                                           |
| url            | The url of the album on Spotify.                                                                                                           |
| artists        | An array of artists [(base artist object)](#base-artist-object) who participated in the album.                                             |
| images         | An array of images of the cover [(base image object)](#base-image-object) of the album.                                                    |
| locations      | An array of country codes of the countries where the album is available on Spotify.                                                        |
| totalTracks    | A number of the total amount of songs in the album.                                                                                        |
| type           | The type of album (album, single or compilation).                                                                                          |
| release        | The date when the album got released.                                                                                                      |

### Base image object
The base image object has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| height         | The height of the image (nullable).                                                                                                        |
| width          | The width of the image (nullable).                                                                                                         |
| url            | The url of the image.                                                                                                                      |

### Base track object
The base track object has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the song.                                                                                                                      |
| id             | The id of the song on Spotify.                                                                                                             |
| uri            | The uri of the song on Spotify.                                                                                                            |
| url            | The url of the song on Spotify.                                                                                                            |
| embedUrl       | The url of the embed of the song.                                                                                                          |
| artists        | An array of artists [(base artist object)](#base-artist-object) who participated in the song.                                              |
| addedTimestamp | A timestamp of the time when the song got added to the playlist. (Only for playlist)                                                       |
| locations      | An array of country codes of the countries where the song is available on Spotify.                                                         |
| previewUrl     | A url of a preview of the song (nullable).                                                                                                 |
| explicit       | Whether the song is explicit or not.                                                                                                       |
| duration       | The duration of the song in miliseconds.                                                                                                   |
| discNumber     | The disc number of the song on Spotify (mostly 1).                                                                                         |
| trackNumber    | The track number of the song on Spotify.                                                                                                   |
| album          | The album the song is in [(base album object)](#base-album-object)                                                                         |

### Base search result object
The base search result object has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| limit          | The limit that has been set for the results.                                                                                               |
| width          | The offset that has been set for the results.                                                                                              |
| total          | The total amount of results.                                                                                                               |
| previousPage   | A function which returns a `Promise` that shows the previous page of results (only available when results isn't the first page, nullable). |
| nextPage       | A function which returns a `Promise` that shows the next page of results (only available when results isn't the last page, nullable).      |
| items          | An array with the results (result depends on the parent*)                                                                                  |

\* _Based on the parent object name:_
* Result items of songs will be the [`ApiTrack`](#get-song-information) class
* Result items of playlists will be the [`SearchPlaylist`](#searchplaylist-class) class
* Result items of albums will be the [`SearchAlbum`](#searchalbum-class) class
* Result items of artists will be the [`ApiArtist`](#get-artist-information) class

### SearchPlaylist class
The `SearchPlaylist` class has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the playlist.                                                                                                                  |
| collaborative  | Whether the owner of the playlist allows others to modify the playlist or not.                                                             |
| url            | The url of the playlist on Spotify.                                                                                                        |
| uri            | The uri of the playlist on Spotify.                                                                                                        |
| embedUrl       | The embed url of the playlist on Spotify.                                                                                                  |
| id             | The id of the playlist on Spotify.                                                                                                         |
| images         | An array of images of the cover [(base image object)](#base-image-object) of the playlist.                                                 |
| owner          | An object of the owner of the playlist [(base image object)](#base-owner-object).                                                          |
| public         | Whether the playlist is public or not.                                                                                                     |
| description    | The descripition of the playlist (`null` for non-modified and non-verified playlists).                                                     |
| getTracks      | A function which returns a `Promise` which gives an array of the songs in the playlist [(base track object)](#base-track-object).          |

## SearchAlbum class
The `SearchAlbum` class has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the album.                                                                                                                     |
| id             | The id of the album on Spotify.                                                                                                            |
| uri            | The uri of the album on Spotify.                                                                                                           |
| url            | The url of the album on Spotify.                                                                                                           |
| locations      | An array of country codes of the countries where the album is available on Spotify.                                                        |
| images         | An array of images of the cover of the album [(base image object)](#base-image-object).                                                    |
| embedUrl       | The embed url of the album on Spotify.                                                                                                     |
| artists        | An array of the artists who participated in the album [(base artist object)](#base-artist-object).                                         |
| type           | The type of the album (album, single or compilation).                                                                                      |
| totalTracks    | The total amount of songs in the album.                                                                                                    |
| release        | The date when the album got released.                                                                                                      |
| copyrights     | An array of the copyrights that count for the album.                                                                                       |
| genres         | An array of genres the album belongs to.                                                                                                   |
| label          | The label associated to the album (nullable).                                                                                              |
| getTracks      | A function which returns a `Promise` which gives an array of the songs in the album [(base track object)](#base-track-object).             |

## Get information without the Spotify API
The Spotify Info package allows you to get information about songs, playlists and albums without making use of the Spotify API. It is recommended though to make use of the API as when Spotify changes their pages, it is possible that the scrape functions might not work anymore. In addition, the scrape functions have to make requests to multiple pages to receive all the information, which makes the Spotify API faster than the scrape functions.

### Get song information
To get a song it's information, you can scrape the Spotify page by using the `scrapeTrack` function. The function has one argument which is the url of the song.
```js
const spotifyInfo = require('spotify-info');

spotifyInfo.scrapeTrack('https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT').then(song => console.log(song.name)).catch(console.log);
```
The `scrapeTrack` function returns a `Promise`, once this is fullfilled, it will return the `ScrapedTrack` class. The `ScrapedTrack` class has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the song.                                                                                                                      |
| id             | The id of the song on Spotify.                                                                                                             |
| artist         | The artist of the song.                                                                                                                    |
| artistUrl      | The url of the artist of the song on Spotify.                                                                                              |
| artistId       | The id of the artist of the song on Spotify.                                                                                               |
| description    | The description of the song on Spotify.                                                                                                    |
| publishDate    | The date when the song got published on Spotify.                                                                                           |
| locations      | An array of country codes of the countries where the song is available on Spotify.                                                         |
| url            | The url of the song on Spotify.                                                                                                            |
| embedUrl       | The embed url of the song on Spotify.                                                                                                      |

### Get playlist information
To get a playlist it's information, you can scrape the Spotify page by using the `scrapePlaylist` function. The function has one argument which is the url of the playlist.
```js
const spotifyInfo = require('spotify-info');

spotifyInfo.scrapePlaylist('https://open.spotify.com/playlist/5pI2mpzVD945Ni9aEB1veE').then(song => console.log(song.name)).catch(console.log);
```
The `scrapePlaylist` function returns a `Promise`, once this is fullfilled, it will return the `ScrapedPlaylist` class. The `ScrapedPlaylist` class has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the playlist on Spotify.                                                                                                       |
| id             | The id of the playlist on Spotify.                                                                                                         |
| creator        | The username of the creator of the playlist on Spotify.                                                                                    |
| creatorId      | The id of the creator of the playlist on Spotify.                                                                                          |
| creatorUrl     | The url of the creator of the playlist on Spotify.                                                                                         |
| thumbnail      | The image which is used as the thumbnail for the playlist on Spotify.                                                                      |
| locations      | An array of country codes of the countries where the playlist is available on Spotify.                                                     |
| description    | The description of the playlist on Spotify.                                                                                                |
| url            | The url of the playlist on Spotify.                                                                                                        |
| embedUrl       | The embed url of the playlist on Spotify.                                                                                                  |
| tracks          | An array of the tracks in the playlist, the tracks make use of the `ScrapedPlaylistTrack` class.                                          |

### Get album information
To get an album it's information, you can scrape the Spotify page by using the `scrapeAlbum` function. The function has one argument which is the url of the album.
```js
const spotifyInfo = require('spotify-info');

spotifyInfo.scrapeAlbum('https://open.spotify.com/album/5Z9iiGl2FcIfa3BMiv6OIw').then(song => console.log(song.name)).catch(console.log);
```
The `scrapeAlbum` function returns a `Promise`, once this is fullfilled, it will return the `scrapeAlbum` class. The `scrapeAlbum` class has the following properties:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the album.                                                                                                                     |
| id             | The id of the album on Spotify.                                                                                                            |
| url            | The url of the album on Spotify.                                                                                                           |
| artist         | The username of the artist of the album on Spotify.                                                                                        |
| artistId       | The id of the artist of the album on Spotify.                                                                                              |
| artistUrl      | The url of the artist of the album on Spotify.                                                                                             |
| thumbnail      | The image which is used as the thumbnail for the album on Spotify.                                                                         |
| locations      | An array of country codes of the countries where the album is available on Spotify.                                                        |
| description    | The description of the album on Spotify.                                                                                                   |
| embedUrl       | The embed url of the album on Spotify.                                                                                                     |
| tracks          | An array of the tracks in the album, the tracks make use of the `ScrapedPlaylistTrack` class.                                             |

### The ScrapedPlaylistTrack class
The `ScrapedPlaylistTrack` class is used for tracks in the `ScrapedPlaylist` class and for tracks in the `ScrapedAlbum` class. The properties of the `ScrapedPlaylistTrack` class are:

| Property       | Description                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| name           | The name of the song.                                                                                                                      |
| artist         | The name of the artist of the song on Spotify.                                                                                             |
| duration       | The duration of the song in miliseconds.                                                                                                   |
| durationString | The duration of the song as a string.                                                                                                      |
