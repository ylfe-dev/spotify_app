import express from 'express'
import https from 'https'
import fs from 'fs'
import connect_redis from 'connect-redis'
import session from 'express-session'

import { RedisClient } from './redis_db.js'

import * as userController from './controllers/user.js';
import * as oAuthController from './controllers/oAuth.js';
import * as contentController from './controllers/content.js';



const app = express();
const port = 3002;
const ssl_options = {
  key:   fs.readFileSync( 'private/localhost.key' ),
  cert:  fs.readFileSync( 'private/localhost.crt' ),
}


const redisClient = await RedisClient();
const cookieStore = new connect_redis({
  client: redisClient,
  ttl: 86400
});



app.use(session({
    secret: 'mySecretIDHashedALot',
    name: '_redisPractice',
    store: cookieStore,
    saveUninitialized: false,
    resave: false,
    cookie: { secure: true }
}));



app.get('/api/oauth_probe', oAuthController.probeSession);
app.get('/api/oauth_logout', oAuthController.logout);
app.get('/api/oauth', oAuthController.closeAuthCodeFlow);


app.get('/api/user', userController.getUser);
app.get('/api/user/top/artists', userController.getUserTopArtists);
app.get('/api/user/top/tracks', userController.getUserTopTracks);
app.get('/api/user/saved', userController.getUserSaved);
app.get('/api/user/albums', userController.getUserAlbums);
app.get('/api/user/artists', userController.getUserArtists);
app.get('/api/user/playlists', userController.getUserPlaylists);

app.get('/api/user/player', userController.getUserPlayer);
app.get('/api/user/player/next', userController.setUserPlayerNext);
app.get('/api/user/player/prev', userController.setUserPlayerPrev);
app.get('/api/user/player/pause', userController.setUserPlayerPause);
app.get('/api/user/player/start', userController.setUserPlayerPlay);
app.get('/api/user/player/play/:context/:id', userController.setUserPlayerTrack);


app.get('/api/album/:id', contentController.getAlbum);
app.get('/api/playlist/:id', contentController.getPlaylist);
app.get('/api/artist/:id', contentController.getArtist);
app.get('/api/artist/:id/top/:country', contentController.getArtistTop);
app.get('/api/artist/:id/albums', contentController.getArtistAlbums);





https.createServer(ssl_options, app).listen(port);