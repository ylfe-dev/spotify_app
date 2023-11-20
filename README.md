# Spotify App by Ylfe


A developer version of web Spotify app (react frontend + oAuth + Node.js backend + Redis db) can be run locally with docker. You only need to provide your Spotify [API devoloper credentials](https://developer.spotify.com/documentation/web-api) to start.

<br />

<p>
<video src="https://ylfe.dev/assets/Yspotify_pc.webm" width="700">
</p>

<br />


## Run App

1. Fetch repo and go into folder:
```shell
$ git clone https://github.com/ylfe-dev/spotify_app.git
```

2. Provide your [Spotify Api credentials](https://developer.spotify.com/documentation/web-api) to `./backend/private/client.js`:
```shell
$ nano ./backend/private/client.js
```
3. Start docker compose, wait a while for dev server to start:
```shell
$ docker compose up
```

Enjoy on `localhost:3001`


<br />

<p>
<video src="https://ylfe.dev/assets/Yspotify_mobile.webm" height="600">
</p>