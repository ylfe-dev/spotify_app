import apiFetcher from './apiFetcher';

const oauthAPI = {
  probe: () => apiFetcher("oauth_probe"),
  auth: (query) => apiFetcher("oauth"+query),
  logout: () => apiFetcher("oauth_logout"),
}

export default oauthAPI;
