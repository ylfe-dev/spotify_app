import { exchangeCodeForToken, oAuthURL, getToken } from "../Token.js"
import { getUser }  from './user.js';
import {RedisClient} from '../redis_db.js'
import spotifyAPI from "../spotifyAPI.js";

export const redirectToAuthCodeFlow = (req, res) => {
	getToken( req.session.user )
  .then(
		token    => res.json({link: false}),
		no_token => {
	    const [link, state] = oAuthURL()
	    req.session.oath_state = state; //PCKE
	    res.json({link: link});
		}
	) 
}

export const closeAuthCodeFlow = (req, res) => {
	const code  = req.query.code  || null,
        state = req.query.state || null,
        error = req.query.error || null;
  

  if (code && state && state === req.session.oath_state) {
    exchangeCodeForToken(code)
    .then(token => {
      spotifyAPI("me", token.access_token)
      .then(user => {
        RedisClient().then(db => db.hSet(
        'user:'+user.email,  {
            mail: user.email,
            token: token.access_token,
            refresh_token: token.refresh_token,
            token_expires:  Date.now() + token.expires_in*1000
        }))
        .then(() => {
          req.session.user = user.email;
          res.redirect("/api/top");
        })
      })
    })
    .catch( error => {
    	console.error("oAuth exchange error: "+error);
    	res.redirect("/oauth_error");
    }
    )
  } else if(error){
  	console.error("oAuth error: "+error);
    res.redirect("/oauth_error");
  } else
    res.redirect("/oauth_error");
}

export const logout = (req, res) => {
  req.session.user = false;
  res.json({status:"ok"})
}