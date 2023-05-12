import { getToken } from "../Token.js"
import { spotifyGET } from "../spotifyAPI.js"



export const getAlbum = (req, res) => spotifyGET(req, res, "albums/"+encodeURI(req.params.id))
	
export const getPlaylist = (req, res) => spotifyGET(req, res, "playlists/"+encodeURI(req.params.id))

export const getArtist = (req, res) => spotifyGET(req, res, "artists/"+encodeURI(req.params.id))

export const getArtistTop = (req, res) => spotifyGET(req, res, "artists/"+encodeURI(req.params.id)+"/top-tracks?market="+encodeURI(req.params.country))

export const getArtistAlbums = (req, res) => spotifyGET(req, res, "artists/"+encodeURI(req.params.id)+"/albums")
