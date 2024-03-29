import apiFetcher from "./apiFetcher";

const userAPI = {
  me: () => apiFetcher("user"),
  topTracks: () => apiFetcher("user/top/tracks", seconds(30)),
  topArtists: () => apiFetcher("user/top/artists", seconds(30)),
  saved: () => apiFetcher("user/saved", seconds(30)),
  albums: () => apiFetcher("user/albums", seconds(30)),
  artists: () => apiFetcher("user/artists", seconds(30)),
  playlists: () => apiFetcher("user/playlists", seconds(30)),
  featured: () => apiFetcher("user/featured", seconds(30)),

  player: () => apiFetcher("user/player", 500),
  playerNext: () => apiFetcher("user/player/next", 500, false),
  playerPrev: () => apiFetcher("user/player/prev", 500, false),
  playerResume: () => apiFetcher("user/player/start", 500, false),
  playerPause: () => apiFetcher("user/player/pause", 500, false),
  playerPlay: (id, context=false) =>
    apiFetcher(
      "user/player/play/" + id + (context ? "/" + context : ""),
      false,
      false
    ),
  queue: () => apiFetcher("user/player/queue", 500),
  recentlyPlayed: () => apiFetcher("user/player/recenly", 500),
  devices: () => apiFetcher("user/player/devices", 500),
  initDevice: (id) => apiFetcher("user/player/device/" + id, 500, false),
};

export default userAPI;

const seconds = (s) => s * 1000;
