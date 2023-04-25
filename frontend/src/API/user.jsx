import apiFetcher from './apiFetcher';

const userAPI = {
  me: () => apiFetcher("user"),
  top: () => apiFetcher("user/top"),
  saved: () => apiFetcher("user/saved"),
  albums: () => apiFetcher("user/albums"),
  playlists: () => apiFetcher("user/playlists"),

  link: () => apiFetcher("oauth_link"),
  oauth: (query) => apiFetcher("oauth"+query),
  error: () => apiFetcher("xxx"),
}

export default userAPI;
