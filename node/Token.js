import request from './request.js';
import { Redis, RedisClient } from './redis_db.js'
import { wwwFormURL, randomString } from './utils.js'
import client from './private/client.js'

const client_auth = Buffer.from(client.id + ':' + client.secret).toString('base64');
const app_auth_scopes = `user-read-private user-read-email user-top-read user-follow-read user-library-read user-read-playback-state user-modify-playback-state playlist-read-private`;
const oauth_uri = 'http://localhost:3001/oauth';


const accountsAPI = (data) => {
	return {
		data: data,
		options: {
		  hostname: 'accounts.spotify.com',
		  path: '/api/token',
		  method: 'POST',
		  headers: { 
		    'Authorization': 'Basic ' + client_auth,
		    'Content-Type': 'application/x-www-form-urlencoded',
		    'Content-Length': Buffer.byteLength(data)
		  },
		}
	}
}


		


export const getToken = (user, force_new = false) => {
	if(user)
		return RedisClient()
			.then(db=>db.hGetAll('user:'+user))
			.then(data=>validateUserToken(data));
	else
		return new Promise((resolve,reject) => reject("No user session"))
}


const validateUserToken = user => {
	return new Promise((resolve, reject) => {
		if(user && user.token && user.token_expires > Date.now()){
			console.log("token is fresh... now:" + Date.now())
			resolve(user.token);
		}
		else if(user && user.refresh_token){
			console.log("refreshing token... now:" + Date.now())
			exchangeRefreshTokenForToken(user.refresh_token)
			.then( 
				fresh_token =>  updateToken(user, fresh_token)
												.then(() => resolve(fresh_token.access_token)),
				error 			=>  clearToken(user.mail)
												.then(() => reject(error)) 
			)
		}else reject("oAuth required");
	})
}


const updateToken = (user, new_token) => {
	console.log("new token expire time: " + new_token.expires_in+"s, now(): "+Date.now())
	return RedisClient().then(db => db.hSet(
	'user:'+user.mail, {
		token:new_token.access_token,
		token_expires: Date.now() + new_token.expires_in * 1000,
		refresh_token: new_token.refresh_token ? new_token.refresh_token : user.refresh_token
	}));
}



export const clearToken = mail => RedisClient().then(db => db.hDel(
	'user:'+mail, ["token","token_expires", "refresh_token"]))


export const oAuthURL = () => { // PKCE!
	const state = randomString(16);

	return ['https://accounts.spotify.com/authorize?' + wwwFormURL({
    response_type: 'code',
    client_id: client.id,
    scope: app_auth_scopes,
    redirect_uri: oauth_uri,
    state: state
  }), state]
}


const exchangeRefreshTokenForToken = refresh_token => {
	const refreshToken = wwwFormURL({
		grant_type: "refresh_token",
		refresh_token: refresh_token
	});
	return request(accountsAPI(refreshToken)).then(data => JSON.parse(data));
}

export const exchangeCodeForToken = code => {
	const exchangeCode = wwwFormURL({
		grant_type: "authorization_code",
		code: code,
		redirect_uri:oauth_uri
	});
	return request(accountsAPI(exchangeCode)).then(data => JSON.parse(data));
}








export const getAppToken = (force_new=false) => { 
	return new Promise((resolve, reject) => {
		if(!force_new && last_token && last_token.expire < Date.now()) 
			resolve(last_token.token)
		else {
			const fetchNewToken = wwwFormURL({
				grant_type: "client_credentials"
			});
			request(accountsAPI(fetchNewToken))
			.then(async function(data){
				const new_token = JSON.parse(data);
				await redisClient.hSet('client_token', {
					token: new_token.access_token,
					expire: Date.now() + new_token.expires_in*100
				})
				resolve(new_token.access_token);
			}, error => reject(error))
		}
	});
}





//await redisClient.disconnect();
