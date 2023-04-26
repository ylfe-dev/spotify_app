import { getToken } from "../Token.js"
import { spotifyGET } from "../spotifyAPI.js"

export const getUser = (req, res) => spotifyGET(req, res, "me")

export const getUserTopArtists = (req, res) => spotifyGET(req, res, "me/top/artists")

export const getUserTopTracks = (req, res) => spotifyGET(req, res, "me/top/tracks")

export const getUserSaved = (req, res) => spotifyGET(req, res, "me/tracks")

export const getUserPlaylists = (req, res) => spotifyGET(req, res, "me/playlists")

export const getUserAlbums = (req, res) => spotifyGET(req, res, "me/albums")
