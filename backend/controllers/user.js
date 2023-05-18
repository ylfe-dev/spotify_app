import { getToken } from "../Token.js"
import { spotifyGET, spotifyPUT, spotifyPOST } from "../spotifyAPI.js"

export const getUser = (req, res) => spotifyGET(req, res, "me")

export const getUserTopArtists = (req, res) => spotifyGET(req, res, "me/top/artists?time_range=short_term")

export const getUserTopTracks = (req, res) => spotifyGET(req, res, "me/top/tracks?time_range=short_term")

export const getUserSaved = (req, res) => spotifyGET(req, res, "me/tracks")

export const getUserArtists = (req, res) => spotifyGET(req, res, "me/following?type=artist")

export const getUserPlaylists = (req, res) => spotifyGET(req, res, "me/playlists")

export const getUserAlbums = (req, res) => spotifyGET(req, res, "me/albums")

export const getUserFeatured = (req, res) => spotifyGET(req, res, "browse/featured-playlists?limit=10")



export const getUserPlayer = (req, res) => spotifyGET(req, res, "me/player")

export const setUserPlayerPlay = (req, res) => spotifyPUT(req, res, "me/player/play")

export const setUserPlayerPause = (req, res) => spotifyPUT(req, res, "me/player/pause")

export const setUserPlayerNext = (req, res) => spotifyPOST(req, res, "me/player/next")

export const setUserPlayerPrev = (req, res) => spotifyPOST(req, res, "me/player/previous")

export const setUserPlayerTrack = (req, res) => spotifyPUT(req, res, "me/player/play", JSON.stringify({uris: ["spotify:track:"+req.params.id]}))

export const setUserPlayerTrackContext = (req, res) => spotifyPUT(req, res, "me/player/play", PlayTrackJSON(req))  

export const getUserPlayerQueue = (req, res) => spotifyGET(req, res, "me/player/queue")

export const getUserPlayerRecently = (req, res) => spotifyGET(req, res, "me/player/recently-played")

export const getUserPlayerDevices = (req, res) => spotifyGET(req, res, "me/player/devices")

export const setUserPlayerDevice = (req, res) => spotifyPUT(req, res, "me/player/play?device_id="+encodeURI(req.params.id))


const PlayTrackJSON = (req) =>{
	const data = {};

	data.context_uri = req.params.context;
	data.offset = { uri: "spotify:track:"+req.params.id };
	data.position_ms = 0;
	
	return  JSON.stringify(data);
}
