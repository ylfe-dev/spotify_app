import { getToken } from "./Token.js"
import request from './request.js';


export const spotifyGET = (req, res, path) => {
  getToken(req.session.user)
  .then(
    token => spotifyAPI(path, token)
      .then(
        json => res.json(json),
        error => res.sendStatus(error)
      ),
    invalid_token => {res.sendStatus(401)}
  ) 
}


export const spotifyAPI = (path, token) => {
  console.log("Request API /"+path)
  const promise = request(APIheader(path, token))
    .then( data => JSON.parse(data), err => err );

  return promise;

}


const APIheader = (path, token) => {
  return {
      options: {
        hostname: 'api.spotify.com',
        path: '/v1/' + path,
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
    }
  }
}