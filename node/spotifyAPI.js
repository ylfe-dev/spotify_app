import request from './request.js';


const spotifyAPI = (path, token) => {
  console.log("Request API with token")
  const promise = request(getAPI(path, token))
    .then( data => JSON.parse(data) );

  return promise;

}

export default spotifyAPI;

const getAPI = (path, token) => {
  return {
      options: {
        hostname: 'api.spotify.com',
        path: '/v1/' + path,
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
    }
  }
}