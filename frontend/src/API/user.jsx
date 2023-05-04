import apiFetcher from './apiFetcher';

const userAPI = {
  me: () => apiFetcher("user"),
  topTracks: () => apiFetcher("user/top/tracks", seconds(30)),
  topArtists: () => apiFetcher("user/top/artists", seconds(30)),
  saved: () => apiFetcher("user/saved",  seconds(30)),
  albums: () => apiFetcher("user/albums", seconds(30)),
  artists: () => apiFetcher("user/artists", seconds(30)),
  playlists: () => apiFetcher("user/playlists", seconds(30)),

  player: () => apiFetcher("user/player"),
  playerNext: () => apiFetcher("user/player/next", false, false),
  playerPrev: () => apiFetcher("user/player/prev", false, false),
  playerStart: () => apiFetcher("user/player/start", false, false),
  playerPouse: () => apiFetcher("user/player/pause", false, false),
  playerPlay: (context, id) => apiFetcher("user/player/play/"+context+"/"+id, false, false),
}

export default userAPI;


const seconds = s => s * 1000;