import { getToken } from "./Token.js"
import request from './request.js';


export const spotifyGET = (req, res, path) => {
  getToken(req.session.user)
  .then(
    token => spotifyAPI(path, token, "GET", true)
      .then(
        json => res.json(json),
        error => res.sendStatus(error)
      ),
    invalid_token => {res.sendStatus(401)}
  ) 
}

export const spotifyPUT = (req, res, path, data=false) => {
  getToken(req.session.user)
  .then(
    token => spotifyAPI(path, token, "PUT", false, data)
      .then(
        data => res.send(data),
        error => res.sendStatus(error)
      ),
    invalid_token => {res.sendStatus(401)}
  ) 
}

export const spotifyPOST = (req, res, path) => {
  getToken(req.session.user)
  .then(
    token => spotifyAPI(path, token, "POST")
      .then(
        data => res.send(data),
        error => res.sendStatus(error)
      ),
    invalid_token => {res.sendStatus(401)}
  ) 
}


export const spotifyAPI = (path, token, method, json=false, data=false) => {
  console.log("Request API /"+path)
  return new Promise((resolve, reject) => {
    const options = data ? APIheaderData(path, token, method, data) : APIheader(path, token, method);
    request(options, data)
    .then( 
      data => json ?  JSON.parse(data) : resolve(data),
      err => reject(err))
    .then( json => resolve(json), err => {console.error(err); reject(204)} )
  })
   

  return promise;

}


const APIheader = (path, token, method) => {
  return {
      options: {
        hostname: 'api.spotify.com',
        path: '/v1/' + path,
        method: method,
        headers: { 'Authorization': 'Bearer ' + token },
    }
  }
}

const APIheaderData = (path, token, method, data) => {
  return {
    data: data,
    options: {
      hostname: 'api.spotify.com',
      path: '/v1/' + path,
      method: method,
      headers: { 
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      },
    }
  }
}