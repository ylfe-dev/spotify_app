import { getToken } from "../Token.js"
import { spotifyGET } from "../spotifyAPI.js"



export const getAlbum = (req, res) => spotifyGET(req, res, "albums/"+req.params.id)
	
export const getPlaylist = (req, res) => spotifyGET(req, res, "playlists/"+req.params.id)

export const getArtist = (req, res) => spotifyGET(req, res, "artists/"+req.params.id)

export const getArtistTop = (req, res) => spotifyGET(req, res, "artists/"+req.params.id+"/top-tracks")

export const getArtistAlbums = (req, res) => spotifyGET(req, res, "artists/"+req.params.id+"/albums")
