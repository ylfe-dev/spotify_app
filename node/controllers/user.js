import { getToken } from "../Token.js"
import spotifyAPI from "../spotifyAPI.js"

export const getUser = (req, res) => {
	getToken(req.session.user)
	.then(
		token => spotifyAPI("me", token)
		  .then(
		    json => res.json(json),
		    error => res.sendStatus(error)
		  ),
		no_token => res.sendStatus(401)
	)
}

export const getUserTop = (req, res) => {
	getToken(req.session.user)
	.then(
		token => spotifyAPI("me/top/artists?time_range=medium_term&limit=10&offset=0", token)
		  .then(
		    json => res.json(json),
		    error => res.sendStatus(error)
		  ),
		invalid_token => {res.sendStatus(401)}
	) 
}

export const getUserSaved = (req, res) => {
	getToken(req.session.user)
	.then(
		token => spotifyAPI("me/tracks", token)
		  .then(
		    json => res.json(json),
		    error => res.sendStatus(error)
		  ),
		invalid_token => {res.sendStatus(401)}
	) 
}

export const getUserPlaylists = (req, res) => {
	getToken(req.session.user)
	.then(
		token => spotifyAPI("me/playlists", token)
		  .then(
		    json => res.json(json),
		    error => res.sendStatus(error)
		  ),
		invalid_token => {res.sendStatus(401)}
	) 
}

export const getUserAlbums = (req, res) => {
	getToken(req.session.user)
	.then(
		token => spotifyAPI("me/albums", token)
		  .then(
		    json => res.json(json),
		    error => res.sendStatus(error)
		  ),
		invalid_token => {res.sendStatus(401)}
	) 
}



export const getAlbum = (req, res) => {
	getToken(req.session.user)
	.then(
		token => spotifyAPI("albums/"+req.params.id, token)
		  .then(
		    json => res.json(json),
		    error => res.sendStatus(error)
		  ),
		invalid_token => {res.sendStatus(401)}
	) 
}

export const getPlaylist = (req, res) => {
	getToken(req.session.user)
	.then(
		token => spotifyAPI("playlists/"+req.params.id, token)
		  .then(
		    json => res.json(json),
		    error => res.sendStatus(error)
		  ),
		invalid_token => {res.sendStatus(401)}
	) 
}



export const getArtist = (req, res) => {
	getToken(req.session.user)
	.then(
		token => spotifyAPI("artists/"+req.params.id, token)
		  .then(
		    json => res.json(json),
		    error => res.sendStatus(error)
		  ),
		invalid_token => {res.sendStatus(401)}
	) 
}
export const getArtistTop = (req, res) => {
	getToken(req.session.user)
	.then(
		token => spotifyAPI("artists/"+req.params.id+"/top-tracks", token)
		  .then(
		    json => res.json(json),
		    error => res.sendStatus(error)
		  ),
		invalid_token => {res.sendStatus(401)}
	) 
}
export const getArtistAlbums = (req, res) => {
	getToken(req.session.user)
	.then(
		token => spotifyAPI("artists/"+req.params.id+"/albums", token)
		  .then(
		    json => res.json(json),
		    error => res.sendStatus(error)
		  ),
		invalid_token => {res.sendStatus(401)}
	) 
}