# Spotify App by Ylfe


A developer version of web Spotify app (react frontend + oAuth + Node.js backend + Redis db) can be run locally with docker. You only need to provide your Spotify [API devoloper credentials](https://developer.spotify.com/documentation/web-api) to start.

<br />

[Yspotify_pc.webm](https://github.com/ylfe-dev/spotify_app/assets/111587746/3eed615e-71aa-4623-9027-aa43864de7d2)


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

[Yspotify_mobile.webm](https://github.com/ylfe-dev/spotify_app/assets/111587746/08e5a646-92f7-4a2e-b581-bc3ff0fde39e)
