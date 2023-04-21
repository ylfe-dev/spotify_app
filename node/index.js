import express from 'express'
import https from 'https'
import fs from 'fs'
import connect_redis from 'connect-redis'
import session from 'express-session'

import {RedisClient} from './redis_db.js'
import spotifyAPI from './spotifyAPI.js'

import { wwwFormURL, randomString } from './utils.js'

import * as userController from './controllers/user.js';
import * as oAuthController from './controllers/oAuth.js';

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

/* --- Cookies
  - user = spotify.com/me
  - token = spotify token
  - refresh_token
  - oauth_state
*/




app.get('/oauth_error', (req,res)=>{res.send("oAuth failed :(")});

app.get('/login', oAuthController.redirectToAuthCodeFlow);
app.get('/logout', oAuthController.logout);
app.get('/oauth', oAuthController.closeAuthCodeFlow);

app.get('/api/user', userController.getUser);
app.get('/api/top', userController.getTop);


app.get('/', function (req, res) {
  if (req.session.user) {
      res.send("Zalogowany")
  } else {
      res.send("Niezalogowany")
  }
});




app.get('/app_token', function (req, res) {
  getAppToken()
  .then(token => spotifyAPI("artists/4Z8W4fKeB5YxbusRsdQVPb", token))
  .then(json => res.send(JSON.stringify(json)))
});



https.createServer(ssl_options, app).listen(port);






//https://localhost:3002/oauth?code=AQAKs4KmTVInfsrv9PNzJvq5vPPMy2n_BwLhoRLMmbzxEKJXOafxtSm_1Wa5PoWE3M6MPPRhty31euE0XABLlbYykzgcIw-du97xqtrO9HAVKfsuPLMydmoBDMzxvOQf2JcjCzkVW-OVJOSdEc4mp5ml9FtodMUhhIAkcUDgtQ-kbQGkpihvI9-t0_v0a0w-1W3uUBSuWYeGAGSnDwXHIuQA0Ys&state=qIvNIlnGVgGbvY9d


/*

//await redisClient.disconnect();

spotifyAPI("artists/4Z8W4fKeB5YxbusRsdQVPb")
.then(console.log)
.catch(console.log)

*/




/*

app.get('/test', function(req, res) {
  console.log("Get /test")
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      var token = body.access_token;
      console.log("Fetched new token: "+token);


      var options = {
        url: 'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log("Fetched api user: " + body);
         res.send(body)
      });
    }
  });
  
});



app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});












var mysql = require('mysql');
var con = mysql.createConnection({
  host: "172.21.0.2",
  user: "root",
  password: "passwd"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
*/

