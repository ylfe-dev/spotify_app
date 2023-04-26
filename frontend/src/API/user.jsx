import apiFetcher from './apiFetcher';

const userAPI = {
  me: () => apiFetcher("user"),
  topTracks: () => apiFetcher("user/top/tracks"),
  topArtists: () => apiFetcher("user/top/artists"),
  saved: () => apiFetcher("user/saved", 3000),
  albums: () => apiFetcher("user/albums"),
  playlists: () => apiFetcher("user/playlists")
}

export default userAPI;
