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



export const getTop = (req, res) => {
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

export const getTrack = (req, res) => {
	getToken(req.session.user)
	.then(
		token => spotifyAPI("tracks/"+req.params.id, token)
		  .then(
		    json => res.json(json),
		    error => res.sendStatus(error)
		  ),
		invalid_token => {res.sendStatus(401)}
	) 
}
